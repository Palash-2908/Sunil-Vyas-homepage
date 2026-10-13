import React, { useRef, useState } from 'react';

const ZoomableImage = ({
  src,
  alt = '',
  className = '',
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [dragging, setDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const startPosition = useRef({ x: 0, y: 0 });

  const handleImageClick = (e) => {
    if (dragging) return;

    const nextScale =
      scale >= 3 ? 1 : scale + 1;

    if (nextScale === 1) {
      setPosition({ x: 0, y: 0 });
    }

    setScale(nextScale);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const zoomAmount = e.deltaY > 0 ? -0.25 : 0.25;

    setScale((current) => {
      const next = Math.min(
        4,
        Math.max(1, current + zoomAmount)
      );

      if (next === 1) {
        setPosition({ x: 0, y: 0 });
      }

      return next;
    });
  };

  const handleMouseDown = (e) => {
    if (scale === 1) return;

    setDragging(false);

    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
    };

    startPosition.current = {
      x: position.x,
      y: position.y,
    };

    const handleMouseMove = (moveEvent) => {
      const dx =
        moveEvent.clientX - dragStart.current.x;

      const dy =
        moveEvent.clientY - dragStart.current.y;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        setDragging(true);
      }

      setPosition({
        x: startPosition.current.x + dx,
        y: startPosition.current.y + dy,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      window.removeEventListener(
        'mouseup',
        handleMouseUp
      );
    };

    window.addEventListener(
      'mousemove',
      handleMouseMove
    );

    window.addEventListener(
      'mouseup',
      handleMouseUp
    );
  };

  const handleDoubleClick = () => {
    if (scale === 1) {
      setScale(2);
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div
      className="w-full h-full overflow-hidden flex items-center justify-center"
      onWheel={handleWheel}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        onClick={handleImageClick}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        className={`
          max-w-full
          max-h-full
          object-contain
          select-none
          transition-transform
          duration-200
          ease-out
          ${scale > 1 ? 'cursor-grab' : 'cursor-zoom-in'}
          ${dragging ? 'cursor-grabbing' : ''}
          ${className}
        `}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
      />
    </div>
  );
};

export default ZoomableImage;