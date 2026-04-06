"use client";

import { useRouter } from "next/navigation";

export default function UpdatesWidget() {
  const router = useRouter();

  return (
    <>
      <style jsx>{`
        .root {
          --widget-bg: #1b1b1b;
          --card-bg: #262626;
          --chip-bg: #1b1b1b;
          --text-muted: #8b8b8b;
          --text-time: #777777;
          --chip-text: #d0d2cc;
          --line-grey: #737373;
          --line-amber: #f5be0b;
          --rail-head-height: 24px;
          --rail-between-height: 0px;
          width: 100%;
          height: 100%;
        }

        .widget {
          width: 100%;
          height: 100%;
          min-height: 390px;
          padding: 8px 10px 8px 10px;
          position: relative;
          font-family: var(--font-body), system-ui, sans-serif;
          color: #ffffff;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .title {
          margin: 0;
          font-size: 20px;
          font-weight: 500;
          line-height: 1;
          font-family: var(--font-body), system-ui, sans-serif;
        }

        .view-all {
          border: 1px solid #434343;
          border-radius: 6px;
          background: var(--card-bg);
          color: #fbfbfb;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1;
          height: 28px;
          min-width: 80px;
          padding: 0 8px;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .view-all:hover {
          background: #ffffff;
          color: #0c0c0c;
        }

        .timeline-stack {
          position: relative;
          z-index: 0;
        }

        .timeline-progress {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 2px;
          overflow: visible;
          pointer-events: none;
          z-index: 0;
        }

        .timeline-progress__track {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 999px;
          overflow: hidden;
        }

        .timeline-progress__segment--head {
          flex: 0 0 var(--rail-head-height);
          min-height: var(--rail-head-height);
          background: transparent;
        }

        .timeline-progress__segment--between {
          flex: 0 0 var(--rail-between-height);
          min-height: var(--rail-between-height);
          background: var(--line-grey);
        }

        .timeline-progress__segment--completed {
          flex: 1 1 0;
          min-height: 12px;
          background: var(--line-amber);
        }

        .timeline-progress__cursor {
          --cursor-size: 10px;
          position: absolute;
          left: calc(50% - var(--cursor-size) / 2);
          top: calc(var(--rail-head-height) + var(--rail-between-height) - var(--cursor-size) / 2);
          width: var(--cursor-size);
          height: var(--cursor-size);
          border-radius: 50%;
          background: var(--line-amber);
          box-shadow: 0 0 0 0 rgba(245, 190, 11, 0.55), 0 0 12px rgba(245, 190, 11, 0.35);
          z-index: 2;
          transform-origin: center center;
          animation: timeline-cursor-enter 0.72s cubic-bezier(0.34, 1.45, 0.64, 1) both,
            timeline-cursor-pulse 2.25s ease-in-out 0.72s infinite;
        }

        @keyframes timeline-cursor-enter {
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

        @keyframes timeline-cursor-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(245, 190, 11, 0.55), 0 0 10px rgba(245, 190, 11, 0.35);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(245, 190, 11, 0), 0 0 18px rgba(245, 190, 11, 0.5);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .timeline-progress__cursor {
            animation: none;
            opacity: 1;
            transform: none;
            filter: none;
          }
        }

        .timeline-list {
          list-style: none;
          margin: 0;
          padding: 0 18px 0 0;
          position: relative;
          z-index: 1;
        }

        .item {
          position: relative;
          width: 100%;
          min-height: 74px;
          background: var(--card-bg);
          border-radius: 8px;
          padding: 12px 12px 13px;
          margin-bottom: 16px;
          transition: background-color 0.65s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .item > :not(.dot) {
          transition: opacity 0.65s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .timeline-stack:has(.item:hover) .item:not(:hover) {
          background: var(--widget-bg);
        }

        .timeline-stack:has(.item:hover) .item:not(:hover) > :not(.dot) {
          opacity: 0.42;
        }

        @media (prefers-reduced-motion: reduce) {
          .item,
          .item > :not(.dot) {
            transition-duration: 0.01ms;
          }
        }

        .item__top {
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
          max-width: 210px;
        }

        .chip {
          background: var(--chip-bg);
          color: var(--chip-text);
          border-radius: 2px;
          font-family: var(--font-mono), monospace;
          font-size: 7px;
          font-weight: 400;
          text-transform: uppercase;
          line-height: 1;
          min-height: 11px;
          padding: 3px 5px;
          display: inline-flex;
          align-items: center;
        }

        .time {
          color: var(--text-time);
          font-family: var(--font-mono), monospace;
          font-size: 8px;
          font-weight: 400;
          line-height: 1;
          margin-top: 1px;
          white-space: nowrap;
        }

        .item__title {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.2;
          font-family: var(--font-heading), system-ui, sans-serif;
        }

        .item__desc {
          margin: 7px 0 0;
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 400;
          line-height: 1.3;
          font-family: var(--font-body), system-ui, sans-serif;
        }

        .dot {
          position: absolute;
          right: -21px;
          top: 50%;
          width: 9.5px;
          height: 9.5px;
          border-radius: 50%;
          transform: translateY(-50%);
          border: 1.5px solid var(--line-amber);
          background: var(--widget-bg);
          z-index: 2;
          transition: transform 0.18s ease, background-color 0.18s ease, border-color 0.18s ease;
        }

        .item:hover .dot {
          transform: translateY(-50%) scale(1.18);
          background: var(--line-amber);
          border-color: var(--line-amber);
        }
      `}</style>

      <section className="root">
        <section className="widget" aria-labelledby="updates-title">
        <header className="header">
          <h1 id="updates-title" className="title">
            Updates
          </h1>
          <button
            className="view-all"
            type="button"
            onClick={() => router.push("/updates")}
          >
            VIEW ALL
          </button>
        </header>

        <div className="timeline-stack">
          <div className="timeline-progress" role="presentation">
            <div className="timeline-progress__track" aria-hidden="true">
              <div className="timeline-progress__segment timeline-progress__segment--head" />
              <div className="timeline-progress__segment timeline-progress__segment--between" />
              <div className="timeline-progress__segment timeline-progress__segment--completed" />
            </div>
            <span className="timeline-progress__cursor" aria-hidden="true" />
          </div>

          <ul className="timeline-list">
            <li className="item item--latest">
              <div className="item__top">
                <div className="chips">
                  <span className="chip">RESEARCH</span>
                </div>
                <span className="time">3h Ago</span>
              </div>
              <p className="item__title">Editing homepage</p>
              <p className="item__desc">Add acceptance criteria.</p>
            </li>

            <li className="item item--latest">
              <div className="item__top">
                <div className="chips">
                  <span className="chip">RESEARCH</span>
                </div>
                <span className="time">3h Ago</span>
              </div>
              <p className="item__title">Editing homepage</p>
              <p className="item__desc">Add acceptance criteria.</p>
              <div className="dot" aria-hidden="true" />
            </li>

            <li className="item">
              <div className="item__top">
                <div className="chips">
                  <span className="chip">STRATEGY</span>
                  <span className="chip">TECH</span>
                  <span className="chip">SOFTWARE</span>
                </div>
                <span className="time">9h Ago</span>
              </div>
              <p className="item__title">Review Required</p>
              <p className="item__desc">Content for the Page needs approval.</p>
              <div className="dot" aria-hidden="true" />
            </li>

            <li className="item">
              <div className="item__top">
                <div className="chips">
                  <span className="chip">BUDGET</span>
                  <span className="chip">TECH</span>
                </div>
                <span className="time">1d Ago</span>
              </div>
              <p className="item__title">Payment Processed</p>
              <p className="item__desc">Payment of 600&#8364; has been received.</p>
              <div className="dot" aria-hidden="true" />
            </li>
          </ul>
        </div>
      </section>
      </section>
    </>
  );
}
