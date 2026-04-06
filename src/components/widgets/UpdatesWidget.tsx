"use client";

import Link from "next/link";

const items = [
  {
    id: "1",
    tags: ["RESEARCH"],
    time: "3h Ago",
    title: "Editing homepage",
    desc: "Add acceptance criteria.",
    inProgress: false,
  },
  {
    id: "2",
    tags: ["STRATEGY", "TECH", "SOFTWARE"],
    time: "9h Ago",
    title: "Review Required",
    desc: "Content for the Page needs approval.",
    inProgress: false,
  },
  {
    id: "3",
    tags: ["BUDGET", "TECH"],
    time: "1d Ago",
    title: "Payment Processed",
    desc: "Payment of 600 EUR has been received.",
    inProgress: true,
  },
];

export default function UpdatesWidget() {
  return (
    <section className="widget" aria-labelledby="updates-widget-title">
      <header className="header">
        <h2 id="updates-widget-title" className="title">
          Updates
        </h2>
        <Link href="/updates" className="viewAll">
          VIEW ALL
        </Link>
      </header>

      <div className="timelineStack">
        <div className="timelineProgress" aria-hidden="true">
          <div className="timelineProgressTrack">
            <div className="progressHead" />
            <div className="progressBetween" />
            <div className="progressCompleted" />
          </div>
          <span className="progressCursor" />
        </div>

        <ul className="list">
          {items.map((item) => (
            <li key={item.id} className="item">
              <div className="itemTop">
                <div className="chips">
                  {item.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="time">{item.time}</span>
              </div>
              <p className="itemTitle">{item.title}</p>
              <p className="itemDesc">{item.desc}</p>
              <div
                className={`dot ${item.inProgress ? "dotInProgress" : ""}`}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .widget {
          width: 100%;
          min-height: 488px;
          padding: 32px 46px;
          border: 1px solid #303030;
          border-radius: 8px;
          background: #1b1b1b;
          position: relative;
          color: #fff;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .title {
          margin: 0;
          font-size: 20px;
          font-weight: 500;
        }

        .viewAll {
          border: none;
          border-radius: 4px;
          background: #262626;
          color: #fbfbfb;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1;
          height: 24px;
          padding: 0 10px;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .viewAll:hover {
          background: #fff;
          color: #0c0c0c;
        }

        .timelineStack {
          position: relative;
        }

        .timelineProgress {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 2px;
          overflow: visible;
          pointer-events: none;
        }

        .timelineProgressTrack {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 999px;
          overflow: hidden;
        }

        .progressHead {
          flex: 0 0 32px;
          background: transparent;
        }

        .progressBetween {
          flex: 0 0 0;
          background: #737373;
        }

        .progressCompleted {
          flex: 1 1 0;
          background: #f5be0b;
        }

        .progressCursor {
          --cursor-size: 10px;
          position: absolute;
          left: calc(50% - var(--cursor-size) / 2);
          top: calc(32px - var(--cursor-size) / 2);
          width: var(--cursor-size);
          height: var(--cursor-size);
          border-radius: 50%;
          background: #f5be0b;
          box-shadow: 0 0 0 0 rgba(245, 190, 11, 0.55),
            0 0 12px rgba(245, 190, 11, 0.35);
          animation: cursorEnter 0.72s cubic-bezier(0.34, 1.45, 0.64, 1) both,
            cursorPulse 2.25s ease-in-out 0.72s infinite;
        }

        @keyframes cursorEnter {
          from {
            opacity: 0;
            transform: scale(0.2);
            filter: blur(3px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        @keyframes cursorPulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(245, 190, 11, 0.55),
              0 0 10px rgba(245, 190, 11, 0.35);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(245, 190, 11, 0),
              0 0 18px rgba(245, 190, 11, 0.5);
          }
        }

        .list {
          list-style: none;
          margin: 0;
          padding: 0 18px 0 0;
          position: relative;
          z-index: 1;
        }

        .item {
          position: relative;
          min-height: 74px;
          background: #262626;
          border-radius: 8px;
          padding: 10px 12px 12px;
          margin-bottom: 14px;
          transition: background-color 0.65s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .item > :not(.dot) {
          transition: opacity 0.65s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .timelineStack:has(.item:hover) .item:not(:hover) {
          background: #1b1b1b;
        }

        .timelineStack:has(.item:hover) .item:not(:hover) > :not(.dot) {
          opacity: 0.42;
        }

        .itemTop {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
          gap: 8px;
        }

        .chips {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }

        .chip {
          background: #1b1b1b;
          color: #d0d2cc;
          border-radius: 2px;
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          text-transform: uppercase;
          line-height: 1;
          padding: 3px 5px;
        }

        .time {
          color: #777;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          white-space: nowrap;
        }

        .itemTitle {
          margin: 0;
          font-size: 20px;
          font-weight: 500;
          line-height: 1.1;
        }

        .itemDesc {
          margin: 7px 0 0;
          color: #8b8b8b;
          font-size: 10px;
        }

        .dot {
          position: absolute;
          right: -22px;
          top: 50%;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          transform: translateY(-50%);
          border: 2px solid #f5be0b;
          background: #1b1b1b;
          transition: transform 0.18s ease, background-color 0.18s ease,
            border-color 0.18s ease;
        }

        .dotInProgress {
          border-color: #8b8b8b;
        }

        .item:hover .dot:not(.dotInProgress) {
          transform: translateY(-50%) scale(1.12);
          background: #f5be0b;
          border-color: #f5be0b;
        }

        .item:hover .dotInProgress {
          transform: translateY(-50%) scale(1.1);
          border-color: #b5b5b5;
        }

        @media (prefers-reduced-motion: reduce) {
          .progressCursor {
            animation: none;
          }

          .item,
          .item > :not(.dot) {
            transition-duration: 0.01ms;
          }
        }
      `}</style>
    </section>
  );
}
