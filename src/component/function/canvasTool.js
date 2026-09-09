import { useRef, useState, useEffect, useCallback } from "react";
import styles from "../../css/canvasTool.module.scss";

const TOOLS = ["select", "rect", "circle", "pen"];

const COLORS = {
  rect: "#e8a33d",
  circle: "#86b6ff",
  pen: "#f2ede2",
};

const CursorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 1.5L13 7L7.6 8.6L6 14L2 1.5Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const RectIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2.5" y="3.5" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const CircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const PenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 13L4 9.5L10.5 3L13 5.5L6.5 12L3 13Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 4.5H13M6 4.5V3C6 2.4 6.4 2 7 2H9C9.6 2 10 2.4 10 3V4.5M11.5 4.5L11 13C11 13.6 10.5 14 10 14H6C5.5 14 5 13.6 5 13L4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const rotatePoint = (px, py, angleDeg) => {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: px * Math.cos(rad) - py * Math.sin(rad),
    y: px * Math.sin(rad) + py * Math.cos(rad),
  };
};

const pathFromPoints = (points) =>
  points.length === 0 ? "" : `M ${points.map((p) => `${p.x} ${p.y}`).join(" L ")}`;

const makeId = () => `s${Date.now()}${Math.floor(Math.random() * 1000)}`;

const CanvasTool = () => {
  const svgRef = useRef(null);
  const dragRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeDimRef = useRef(null);
  const [tool, setTool] = useState("select");
  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [drawingPreview, setDrawingPreview] = useState(null);

  const getPoint = useCallback((e) => {
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const finalizeDrawShape = useCallback((preview) => {
    if (!preview) return;
    if (preview.w <= 6 && preview.h <= 6) return;
    const id = makeId();
    setShapes((prev) => [
      ...prev,
      {
        id,
        type: preview.type,
        x: preview.x,
        y: preview.y,
        w: preview.w,
        h: preview.h,
        rotation: 0,
        color: COLORS[preview.type],
      },
    ]);
    setSelectedId(id);
    setTool("select");
  }, []);

  const finalizeDrawPen = useCallback((points) => {
    if (!points || points.length < 2) return;
    const xs = points.map((pt) => pt.x);
    const ys = points.map((pt) => pt.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    const id = makeId();
    setShapes((prev) => [
      ...prev,
      {
        id,
        type: "pen",
        x: minX,
        y: minY,
        w: Math.max(maxX - minX, 8),
        h: Math.max(maxY - minY, 8),
        rotation: 0,
        color: COLORS.pen,
        points: points.map((pt) => ({ x: pt.x - minX, y: pt.y - minY })),
      },
    ]);
    setSelectedId(id);
    setTool("select");
  }, []);

  const onWindowMouseMove = useCallback(
    (e) => {
      const drag = dragRef.current;
      if (!drag) return;
      const p = getPoint(e);

      if (drag.mode === "draw-shape") {
        const left = Math.min(drag.startX, p.x);
        const top = Math.min(drag.startY, p.y);
        const w = Math.abs(p.x - drag.startX);
        const h = Math.abs(p.y - drag.startY);
        const preview = { type: drag.shapeType, x: left, y: top, w, h };
        drag.preview = preview;
        setDrawingPreview(preview);
      } else if (drag.mode === "draw-pen") {
        drag.points.push(p);
        const preview = { type: "pen", points: drag.points.slice() };
        drag.preview = preview;
        setDrawingPreview(preview);
      } else if (drag.mode === "move") {
        const dx = p.x - drag.startX;
        const dy = p.y - drag.startY;
        setShapes((prev) =>
          prev.map((s) =>
            s.id === drag.id ? { ...s, x: drag.origX + dx, y: drag.origY + dy } : s
          )
        );
      } else if (drag.mode === "resize") {
        const dx = p.x - drag.startX;
        const dy = p.y - drag.startY;
        const local = rotatePoint(dx, dy, -drag.origRotation);
        const newW = Math.max(16, drag.origW + local.x);
        const newH = Math.max(16, drag.origH + local.y);
        setShapes((prev) =>
          prev.map((s) => (s.id === drag.id ? { ...s, w: newW, h: newH } : s))
        );
      } else if (drag.mode === "rotate") {
        const angleRad = Math.atan2(p.y - drag.centerY, p.x - drag.centerX);
        const angleDeg = (angleRad * 180) / Math.PI + 90;
        setShapes((prev) =>
          prev.map((s) => (s.id === drag.id ? { ...s, rotation: angleDeg } : s))
        );
      } else if (drag.mode === "marquee") {
        const left = Math.min(drag.startX, p.x);
        const top = Math.min(drag.startY, p.y);
        const w = Math.abs(p.x - drag.startX);
        const h = Math.abs(p.y - drag.startY);
        if (marqueeRef.current) {
          marqueeRef.current.style.left = `${left}px`;
          marqueeRef.current.style.top = `${top}px`;
          marqueeRef.current.style.width = `${w}px`;
          marqueeRef.current.style.height = `${h}px`;
        }
        if (marqueeDimRef.current) {
          marqueeDimRef.current.style.left = `${left + w}px`;
          marqueeDimRef.current.style.top = `${top + h}px`;
          marqueeDimRef.current.textContent = `${Math.round(w)} × ${Math.round(h)}`;
          marqueeDimRef.current.style.opacity = w > 4 || h > 4 ? "1" : "0";
        }
      }
    },
    [getPoint]
  );

  const onWindowMouseUp = useCallback(() => {
    const drag = dragRef.current;
    if (drag && drag.mode === "draw-shape") {
      finalizeDrawShape(drag.preview);
      setDrawingPreview(null);
    } else if (drag && drag.mode === "draw-pen") {
      finalizeDrawPen(drag.points);
      setDrawingPreview(null);
    } else if (drag && drag.mode === "marquee") {
      if (marqueeRef.current) {
        marqueeRef.current.style.transition = "opacity 0.6s ease";
        marqueeRef.current.style.opacity = "0";
      }
      if (marqueeDimRef.current) {
        marqueeDimRef.current.style.opacity = "0";
      }
    }
    dragRef.current = null;
    window.removeEventListener("mousemove", onWindowMouseMove);
    window.removeEventListener("mouseup", onWindowMouseUp);
  }, [finalizeDrawShape, finalizeDrawPen, onWindowMouseMove]);

  const beginDrag = (drag) => {
    dragRef.current = drag;
    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
    };
  }, [onWindowMouseMove, onWindowMouseUp]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.key === "Backspace" || e.key === "Delete") && selectedId) {
        setShapes((prev) => prev.filter((s) => s.id !== selectedId));
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedId]);

  const handleSvgMouseDown = (e) => {
    if (e.button !== 0) return;
    const p = getPoint(e);
    if (tool === "rect" || tool === "circle") {
      const preview = { type: tool, x: p.x, y: p.y, w: 0, h: 0 };
      setDrawingPreview(preview);
      beginDrag({ mode: "draw-shape", shapeType: tool, startX: p.x, startY: p.y, preview });
    } else if (tool === "pen") {
      setDrawingPreview({ type: "pen", points: [p] });
      beginDrag({ mode: "draw-pen", points: [p] });
    } else {
      setSelectedId(null);
      if (marqueeRef.current) {
        marqueeRef.current.style.transition = "none";
        marqueeRef.current.style.left = `${p.x}px`;
        marqueeRef.current.style.top = `${p.y}px`;
        marqueeRef.current.style.width = "0px";
        marqueeRef.current.style.height = "0px";
        marqueeRef.current.style.opacity = "1";
      }
      beginDrag({ mode: "marquee", startX: p.x, startY: p.y });
    }
  };

  const startMove = (e, shape) => {
    e.stopPropagation();
    if (tool !== "select") return;
    setSelectedId(shape.id);
    const p = getPoint(e);
    beginDrag({ mode: "move", id: shape.id, startX: p.x, startY: p.y, origX: shape.x, origY: shape.y });
  };

  const startResize = (e, shape) => {
    e.stopPropagation();
    const p = getPoint(e);
    beginDrag({
      mode: "resize",
      id: shape.id,
      startX: p.x,
      startY: p.y,
      origW: shape.w,
      origH: shape.h,
      origRotation: shape.rotation,
    });
  };

  const startRotate = (e, shape) => {
    e.stopPropagation();
    const centerX = shape.x + shape.w / 2;
    const centerY = shape.y + shape.h / 2;
    beginDrag({ mode: "rotate", id: shape.id, centerX, centerY });
  };

  const clearAll = () => {
    setShapes([]);
    setSelectedId(null);
  };

  const renderShape = (shape) => {
    const isSelected = tool === "select" && shape.id === selectedId;
    const cx = shape.x + shape.w / 2;
    const cy = shape.y + shape.h / 2;
    const groupTransform = `translate(${cx} ${cy}) rotate(${shape.rotation}) translate(${-cx} ${-cy})`;

    let body;
    if (shape.type === "rect") {
      body = (
        <rect
          x={shape.x}
          y={shape.y}
          width={shape.w}
          height={shape.h}
          fill={`${shape.color}22`}
          stroke={shape.color}
          strokeWidth="1.6"
        />
      );
    } else if (shape.type === "circle") {
      body = (
        <ellipse
          cx={cx}
          cy={cy}
          rx={shape.w / 2}
          ry={shape.h / 2}
          fill={`${shape.color}22`}
          stroke={shape.color}
          strokeWidth="1.6"
        />
      );
    } else {
      body = (
        <path
          d={pathFromPoints(shape.points.map((p) => ({ x: p.x + shape.x, y: p.y + shape.y })))}
          fill="none"
          stroke={shape.color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    }

    return (
      <g
        key={shape.id}
        transform={groupTransform}
        style={{ pointerEvents: tool === "select" ? "visiblePainted" : "none", cursor: "move" }}
        onMouseDown={(e) => startMove(e, shape)}
      >
        {body}
        {isSelected && (
          <>
            <rect
              x={shape.x - 4}
              y={shape.y - 4}
              width={shape.w + 8}
              height={shape.h + 8}
              fill="none"
              stroke="#e8a33d"
              strokeDasharray="3 3"
              strokeWidth="1"
              style={{ pointerEvents: "none" }}
            />
            <line
              x1={cx}
              y1={shape.y - 4}
              x2={cx}
              y2={shape.y - 22}
              stroke="#e8a33d"
              strokeWidth="1"
              style={{ pointerEvents: "none" }}
            />
            <circle
              cx={cx}
              cy={shape.y - 22}
              r="5"
              fill="#14161d"
              stroke="#e8a33d"
              strokeWidth="1.5"
              style={{ pointerEvents: "auto", cursor: "grab" }}
              onMouseDown={(e) => startRotate(e, shape)}
            />
            <rect
              x={shape.x + shape.w - 2}
              y={shape.y + shape.h - 2}
              width="9"
              height="9"
              fill="#14161d"
              stroke="#e8a33d"
              strokeWidth="1.5"
              style={{ pointerEvents: "auto", cursor: "nwse-resize" }}
              onMouseDown={(e) => startResize(e, shape)}
            />
          </>
        )}
      </g>
    );
  };

  const renderPreview = () => {
    if (!drawingPreview) return null;
    if (drawingPreview.type === "pen") {
      return (
        <path
          d={pathFromPoints(drawingPreview.points)}
          fill="none"
          stroke={COLORS.pen}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pointerEvents: "none" }}
        />
      );
    }
    const color = COLORS[drawingPreview.type];
    if (drawingPreview.type === "rect") {
      return (
        <rect
          x={drawingPreview.x}
          y={drawingPreview.y}
          width={drawingPreview.w}
          height={drawingPreview.h}
          fill={`${color}22`}
          stroke={color}
          strokeDasharray="4 3"
          strokeWidth="1.6"
          style={{ pointerEvents: "none" }}
        />
      );
    }
    return (
      <ellipse
        cx={drawingPreview.x + drawingPreview.w / 2}
        cy={drawingPreview.y + drawingPreview.h / 2}
        rx={drawingPreview.w / 2}
        ry={drawingPreview.h / 2}
        fill={`${color}22`}
        stroke={color}
        strokeDasharray="4 3"
        strokeWidth="1.6"
        style={{ pointerEvents: "none" }}
      />
    );
  };

  return (
    <>
      <div className={styles.toolbar} onMouseDown={(e) => e.stopPropagation()}>
        {TOOLS.map((t) => (
          <button
            key={t}
            className={tool === t ? styles.toolActive : styles.tool}
            onClick={() => {
              setTool(t);
              setSelectedId(null);
            }}
            aria-label={t}
            type="button"
          >
            {t === "select" && <CursorIcon />}
            {t === "rect" && <RectIcon />}
            {t === "circle" && <CircleIcon />}
            {t === "pen" && <PenIcon />}
          </button>
        ))}
        <div className={styles.toolDivider}></div>
        <button className={styles.tool} onClick={clearAll} aria-label="clear" type="button">
          <TrashIcon />
        </button>
      </div>

      <svg
        ref={svgRef}
        className={styles.canvas}
        onMouseDown={handleSvgMouseDown}
      >
        {shapes.map(renderShape)}
        {renderPreview()}
      </svg>

      <div className={styles.marqueeRect} ref={marqueeRef} aria-hidden="true"></div>
      <div className={styles.marqueeDim} ref={marqueeDimRef} aria-hidden="true"></div>
    </>
  );
};

export default CanvasTool;
