"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./budget-snapshot.css";

const SEGMENT_RATIO = {
  design: 40 / 80,
  development: 25 / 80,
  testing: 15 / 80,
};

function getDonutBackground(usedPercent: number): string {
  const clamped = Math.min(100, Math.max(0, usedPercent));
  const design = clamped * SEGMENT_RATIO.design;
  const development = clamped * SEGMENT_RATIO.development;
  const testing = clamped * SEGMENT_RATIO.testing;
  const degDesign = (design / 100) * 360;
  const degDevelopment = (development / 100) * 360;
  const degTesting = (testing / 100) * 360;
  const degUsed = degDesign + degDevelopment + degTesting;
  return (
    "radial-gradient(circle at center, var(--card-bg) 52%, transparent 53%)," +
      "conic-gradient(" +
      "var(--yellow) 0deg, var(--yellow) " +
      degDesign +
      "deg," +
      "var(--blue) " +
      degDesign +
      "deg, var(--blue) " +
      (degDesign + degDevelopment) +
      "deg," +
      "var(--green) " +
      (degDesign + degDevelopment) +
      "deg, var(--green) " +
      degUsed +
      "deg," +
      "transparent " +
      degUsed +
      "deg, transparent 360deg" +
      ")"
  );
}

function getLabelColors(rounded: number): { percent: string; used: string } {
  if (rounded < 40) {
    return { percent: "var(--green)", used: "var(--green)" };
  }
  if (rounded <= 70) {
    return { percent: "var(--yellow)", used: "var(--yellow)" };
  }
  return { percent: "var(--orange)", used: "var(--orange)" };
}

export function BudgetSnapshotWidget() {
  const [usedPercent, setUsedPercent] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyMonth, setHistoryMonth] = useState("March");
  const historyScrollRef = useRef<HTMLDivElement>(null);

  const rounded = Math.round(usedPercent);
  const donutBackground = useMemo(() => getDonutBackground(usedPercent), [usedPercent]);
  const labelColors = useMemo(() => getLabelColors(rounded), [rounded]);

  useEffect(() => {
    const initialTotal = 50000;
    const initialSpent = 22500;
    const targetUsed =
      initialTotal > 0 ? (initialSpent / initialTotal) * 100 : 0;
    const designTarget = targetUsed * SEGMENT_RATIO.design;
    const developmentTarget = targetUsed * SEGMENT_RATIO.development;
    const testingTarget = targetUsed * SEGMENT_RATIO.testing;
    let designCurrent = 0;
    let developmentCurrent = 0;
    let testingCurrent = 0;
    const step = 0.8;
    const intervalMs = 16;

    const timer = window.setInterval(() => {
      let done = true;
      if (designCurrent < designTarget) {
        designCurrent = Math.min(designCurrent + step, designTarget);
        done = false;
      }
      if (developmentCurrent < developmentTarget) {
        developmentCurrent = Math.min(developmentCurrent + step, developmentTarget);
        done = false;
      }
      if (testingCurrent < testingTarget) {
        testingCurrent = Math.min(testingCurrent + step, testingTarget);
        done = false;
      }
      const totalUsed = designCurrent + developmentCurrent + testingCurrent;
      setUsedPercent(totalUsed);
      if (done) {
        window.clearInterval(timer);
      }
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, []);

  const updateHistoryMonthLabel = useCallback(() => {
    const historyScroll = historyScrollRef.current;
    if (!historyScroll) return;
    const groups = historyScroll.querySelectorAll<HTMLElement>("[data-month]");
    if (!groups.length) return;
    const currentScroll = historyScroll.scrollTop + 24;
    let currentGroup = groups[0];

    for (const group of groups) {
      if (group.offsetTop <= currentScroll) {
        currentGroup = group;
      } else {
        break;
      }
    }

    const month = currentGroup.getAttribute("data-month");
    if (month) setHistoryMonth(month);
  }, []);

  useEffect(() => {
    if (!historyOpen) return;
    updateHistoryMonthLabel();
  }, [historyOpen, updateHistoryMonthLabel]);

  return (
    <div className="budget-snapshot">
      <div className="budget-card">
        <div className="budget-card__header">
          <div className="budget-card__title">
            <span className="budget-card__title-main font-[family-name:var(--font-heading)] text-[20px]">
              Current Balance
            </span>
            <span className="budget-card__subtitle text-[9px]">● Updated 1 h ago</span>
          </div>
          <button
            type="button"
            className="budget-card__history-btn font-[family-name:var(--font-mono)]"
            onClick={() => setHistoryOpen(true)}
          >
            History
          </button>
        </div>

        <div className="budget-card__amount-block">
          <div className="budget-card__month font-[family-name:var(--font-heading)] text-[12px]">
            March
          </div>
          <div className="budget-card__amount font-[family-name:var(--font-heading)] text-[36px] tracking-[-1.1942px]">
            $27,500
          </div>
          <div className="budget-card__subamount text-[9px]">
            [ $22,500 of $50,000 spent ]
          </div>
        </div>

        <div className="budget-card__center">
          <div className="donut-wrapper">
            <div className="donut-bg" />
            <div
              className="donut-progress"
              style={{ background: donutBackground }}
            />
            <div className="donut-center-label font-[family-name:var(--font-mono)]">
              <div
                className="donut-center-label__percent text-[12px] leading-none"
                style={{ color: labelColors.percent }}
              >
                {rounded}%
              </div>
              <div
                className="donut-center-label__text text-[12px] leading-none"
                style={{ color: labelColors.used }}
              >
                used
              </div>
            </div>
          </div>

          <div className="legend gap-[22px]">
            <div className="legend-item font-[family-name:var(--font-mono)]">
              <div className="legend-dot legend-dot--yellow h-2 w-2" />
              <span>Design</span>
            </div>
            <div className="legend-item font-[family-name:var(--font-mono)]">
              <div className="legend-dot legend-dot--blue h-2 w-2" />
              <span>Development</span>
            </div>
            <div className="legend-item font-[family-name:var(--font-mono)]">
              <div className="legend-dot legend-dot--green h-2 w-2" />
              <span>Testing</span>
            </div>
          </div>
        </div>

        <div className="budget-card__footer mx-auto max-w-[222px] text-[9px] leading-[normal]">
          Spending increased this month due to additional development hours required
          for feature refinement.
        </div>
      </div>

      {historyOpen ? (
        <div
          className="history-modal-overlay flex"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setHistoryOpen(false);
          }}
        >
          <div
            className="history-modal"
            role="dialog"
            aria-labelledby="historyModalTitle"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="history-modal__header">
              <h2
                className="history-modal__title font-[family-name:var(--font-heading)]"
                id="historyModalTitle"
              >
                Budget History
              </h2>
              <button
                type="button"
                className="history-modal__close material-symbols-outlined"
                onClick={() => setHistoryOpen(false)}
                aria-label="Close history"
              >
                close
              </button>
            </div>
            <p className="history-modal__month font-[family-name:var(--font-body)]">
              {historyMonth}
            </p>

            <div
              ref={historyScrollRef}
              className="history-modal__scroll"
              onScroll={updateHistoryMonthLabel}
            >
              <section className="history-group" data-month="March">
                <div className="history-group__meta font-[family-name:var(--font-mono)]">
                  <span>[ TODAY ]</span>
                  <span className="history-group__sum">+ $900</span>
                </div>
                <div className="history-card">
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--blue" />
                        DEVELOPMENT
                      </div>
                      <p className="history-item__desc">
                        Increased scope for feature refinement
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--plus font-[family-name:var(--font-heading)]">
                      + $1000
                    </span>
                  </div>
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--blue" />
                        DEVELOPMENT
                      </div>
                      <p className="history-item__desc">
                        Reduce budget due to additional development hours
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--minus font-[family-name:var(--font-heading)]">
                      - $100
                    </span>
                  </div>
                </div>
              </section>

              <section className="history-group" data-month="March">
                <div className="history-group__meta font-[family-name:var(--font-mono)]">
                  <span>[ MAR 15TH ]</span>
                  <span className="history-group__sum">+ $500</span>
                </div>
                <div className="history-card">
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--yellow" />
                        DESIGN
                      </div>
                      <p className="history-item__desc">
                        Increased scope for feature refinement.
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--plus font-[family-name:var(--font-heading)]">
                      + $500
                    </span>
                  </div>
                </div>
              </section>

              <section className="history-group" data-month="March">
                <div className="history-group__meta font-[family-name:var(--font-mono)]">
                  <span>[ MAR 10TH ]</span>
                  <span className="history-group__sum">+ $2,200</span>
                </div>
                <div className="history-card">
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--green" />
                        TESTING
                        <span
                          className="history-dot history-dot--blue"
                          style={{ marginLeft: 6 }}
                        />
                        DEVELOPMENT
                      </div>
                      <p className="history-item__desc">
                        Reallocated budget from testing to development.
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--plus font-[family-name:var(--font-heading)]">
                      + $2,500
                    </span>
                  </div>
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--yellow" />
                        DESIGN
                      </div>
                      <p className="history-item__desc">Extra design iterations required</p>
                    </div>
                    <span className="history-item__amount history-item__amount--minus font-[family-name:var(--font-heading)]">
                      - $300
                    </span>
                  </div>
                </div>
              </section>

              <section className="history-group" data-month="March">
                <div className="history-group__meta font-[family-name:var(--font-mono)]">
                  <span>[ MAR 6TH ]</span>
                  <span className="history-group__sum">+ $1,000</span>
                </div>
                <div className="history-card">
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--blue" />
                        DEVELOPMENT
                      </div>
                      <p className="history-item__desc">
                        Added integration support for analytics and reporting API.
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--plus font-[family-name:var(--font-heading)]">
                      + $1,200
                    </span>
                  </div>
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--green" />
                        TESTING
                      </div>
                      <p className="history-item__desc">
                        Automated test coverage reduced manual QA hours.
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--minus font-[family-name:var(--font-heading)]">
                      - $200
                    </span>
                  </div>
                </div>
              </section>

              <section className="history-group" data-month="February">
                <div className="history-group__meta font-[family-name:var(--font-mono)]">
                  <span>[ FEB 28TH ]</span>
                  <span className="history-group__sum">+ $400</span>
                </div>
                <div className="history-card">
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--yellow" />
                        DESIGN
                      </div>
                      <p className="history-item__desc">
                        Expanded dashboard states for empty, loading, and error views.
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--plus font-[family-name:var(--font-heading)]">
                      + $600
                    </span>
                  </div>
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--yellow" />
                        DESIGN
                      </div>
                      <p className="history-item__desc">
                        Streamlined icon set and removed duplicate assets.
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--minus font-[family-name:var(--font-heading)]">
                      - $200
                    </span>
                  </div>
                </div>
              </section>

              <section className="history-group" data-month="February">
                <div className="history-group__meta font-[family-name:var(--font-mono)]">
                  <span>[ FEB 22ND ]</span>
                  <span className="history-group__sum">+ $1,300</span>
                </div>
                <div className="history-card">
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--blue" />
                        DEVELOPMENT
                        <span
                          className="history-dot history-dot--green"
                          style={{ marginLeft: 6 }}
                        />
                        TESTING
                      </div>
                      <p className="history-item__desc">
                        Reworked build pipeline and test environments for release prep.
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--plus font-[family-name:var(--font-heading)]">
                      + $1,500
                    </span>
                  </div>
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--green" />
                        TESTING
                      </div>
                      <p className="history-item__desc">
                        Removed redundant regression test cycles.
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--minus font-[family-name:var(--font-heading)]">
                      - $200
                    </span>
                  </div>
                </div>
              </section>

              <section className="history-group" data-month="February">
                <div className="history-group__meta font-[family-name:var(--font-mono)]">
                  <span>[ FEB 14TH ]</span>
                  <span className="history-group__sum">+ $700</span>
                </div>
                <div className="history-card">
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--yellow" />
                        DESIGN
                      </div>
                      <p className="history-item__desc">
                        Created additional prototypes for stakeholder review.
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--plus font-[family-name:var(--font-heading)]">
                      + $900
                    </span>
                  </div>
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--blue" />
                        DEVELOPMENT
                      </div>
                      <p className="history-item__desc">
                        Refactored data services to simplify maintenance.
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--minus font-[family-name:var(--font-heading)]">
                      - $200
                    </span>
                  </div>
                </div>
              </section>

              <section className="history-group" data-month="February">
                <div className="history-group__meta font-[family-name:var(--font-mono)]">
                  <span>[ FEB 3RD ]</span>
                  <span className="history-group__sum">+ $350</span>
                </div>
                <div className="history-card">
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--green" />
                        TESTING
                      </div>
                      <p className="history-item__desc">
                        Added accessibility checks to the pre-release checklist.
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--plus font-[family-name:var(--font-heading)]">
                      + $500
                    </span>
                  </div>
                  <div className="history-item">
                    <div className="history-item__left">
                      <div className="history-tag font-[family-name:var(--font-mono)]">
                        <span className="history-dot history-dot--yellow" />
                        DESIGN
                      </div>
                      <p className="history-item__desc">
                        Standardized spacing tokens across the component set.
                      </p>
                    </div>
                    <span className="history-item__amount history-item__amount--minus font-[family-name:var(--font-heading)]">
                      - $150
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
