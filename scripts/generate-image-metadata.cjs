const fs = require('fs');
const path = require('path');
const { imageSize } = require('image-size');

const projectRoot = process.cwd();

const imagesRoot = path.join(
  projectRoot,
  'public',
  'images',
  'Artworks'
);

const outputFile = path.join(
  projectRoot,
  'src',
  'data',
  'imageDimensions.js'
);

const supportedExtensions = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
]);

/**
 * Recursively find all image files
 */
function getImageFiles(directory) {
  const files = [];

  if (!fs.existsSync(directory)) {
    return files;
  }

  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...getImageFiles(fullPath));
    } else {
      const extension = path.extname(entry.name).toLowerCase();

      if (supportedExtensions.has(extension)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

console.log('Scanning artwork images...\n');

const imageFiles = getImageFiles(imagesRoot);

const metadata = {};

for (const filePath of imageFiles) {
  try {
    const buffer = fs.readFileSync(filePath);

    const dimensions = imageSize(buffer);

    if (!dimensions.width || !dimensions.height) {
      console.warn(`⚠ Could not determine dimensions: ${filePath}`);
      continue;
    }

    /*
     * Convert:
     * public/images/Artworks/Wooden Scrap Art/image.jpg
     *
     * into:
     * /images/Artworks/Wooden Scrap Art/image.jpg
     */

    const relativePath = path
      .relative(
        path.join(projectRoot, 'public'),
        filePath
      )
      .split(path.sep)
      .join('/');

    const publicPath = `/${relativePath}`;

    metadata[publicPath] = {
      width: dimensions.width,
      height: dimensions.height,
    };

    console.log(
      `✓ ${publicPath} → ${dimensions.width} × ${dimensions.height}`
    );
  } catch (error) {
    console.warn(
      `⚠ Failed to process: ${filePath}`
    );
    console.warn(`  ${error.message}`);
  }
}

/*
 * Make sure src/data exists
 */
const dataDirectory = path.dirname(outputFile);

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, {
    recursive: true,
  });
}

/*
 * Generate JavaScript file
 */
const output = `const imageDimensions = ${JSON.stringify(
  metadata,
  null,
  2
)};

export default imageDimensions;
`;

fs.writeFileSync(outputFile, output, 'utf8');

console.log('\n----------------------------------------');
console.log(`✓ Processed ${imageFiles.length} images`);
console.log(`✓ Metadata generated:`);
console.log(`  ${outputFile}`);
console.log('----------------------------------------\n');