import { useState } from "react";
import styles from "../../css/priceAlertDemo.module.scss";
import { useLanguage } from "./languageContext";

const CONDITIONS_CH = [
  "成交價低於",
  "成交價高於",
  "漲停",
  "跌停",
  "單量超過",
  "總量超過",
];
const CONDITIONS_EN = [
  "Trade price below",
  "Trade price above",
  "Limit up",
  "Limit down",
  "Volume above",
  "Total volume above",
];

const SEED_CH = [
  { id: "seed1", stock: "00878 國泰永續高股息", conditionText: "成交價低於30.00", freq: "每日1次" },
  { id: "seed2", stock: "00878 國泰永續高股息", conditionText: "單量超過1230", freq: "每日1次" },
  { id: "seed3", stock: "00919 群益台灣精選高股息", conditionText: "股價創120日新低", freq: "定時16:00通知" },
  { id: "seed4", stock: "2330 台積電", conditionText: "股價突破年線", freq: "定時16:00通知" },
  { id: "seed5", stock: "2330 台積電", conditionText: "成交價高於2400", freq: "每日1次" },
  { id: "seed6", stock: "2330 台積電", conditionText: "跌破1970.00", freq: "每日1次" },
];
const SEED_EN = [
  { id: "seed1", stock: "00878 Cathay Sustainable High Div.", conditionText: "Trade price below 30.00", freq: "Once daily" },
  { id: "seed2", stock: "00878 Cathay Sustainable High Div.", conditionText: "Volume above 1230", freq: "Once daily" },
  { id: "seed3", stock: "00919 Cathay Taiwan High Div.", conditionText: "New 120-day low", freq: "Notify at 16:00" },
  { id: "seed4", stock: "2330 TSMC", conditionText: "Price breaks yearline", freq: "Notify at 16:00" },
  { id: "seed5", stock: "2330 TSMC", conditionText: "Trade price above 2400", freq: "Once daily" },
  { id: "seed6", stock: "2330 TSMC", conditionText: "Drops below 1970.00", freq: "Once daily" },
];

const RECORDS_CH = [
  { stock: "00878 國泰永續高股息", note: "成交價低於30.00", time: "2026/05/22 13:00" },
  { stock: "00878 國泰永續高股息", note: "股價突破年線", time: "2026/05/22 13:00" },
];
const RECORDS_EN = [
  { stock: "00878 Cathay Sustainable High Div.", note: "Price below 30.00", time: "2026/05/22 13:00" },
  { stock: "00878 Cathay Sustainable High Div.", note: "Price broke yearline", time: "2026/05/22 13:00" },
];

const TSMC_LABEL_CH = "2330 台積電";
const TSMC_LABEL_EN = "2330 TSMC";

const StockQuotePage = ({ isEn, stockLabel, onBell }) => (
  <div className={styles.stockPage}>
    <div className={styles.stockPageHeader}>
      <span className={styles.backChevron}>‹</span>
      <span>{stockLabel}</span>
      <span className={styles.searchIcon}>🔍</span>
    </div>
    <div className={styles.stockPricePanel}>
      <div className={styles.stockPriceMain}>
        <span className={styles.bigPrice}>2230.00</span>
        <span className={styles.priceDelta}>▲45.00 +2.06%</span>
      </div>
      <div className={styles.oddLotTag}>{isEn ? "Odd Lot ›" : "零股 ›"}</div>
    </div>
    <div className={styles.stockSubTabs}>
      {(isEn
        ? ["Technical", "Chips", "Basic", "Financial", "News"]
        : ["技術", "籌碼", "基本", "財務", "新聞"]
      ).map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
    <div className={styles.chartPlaceholder}>
      <svg viewBox="0 0 300 90" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke="#e5484d"
          strokeWidth="1.5"
          points="0,50 20,30 40,35 60,20 80,40 100,45 120,25 140,15 160,30 180,35 200,20 220,10 240,25 260,18 280,22 300,15"
        />
      </svg>
    </div>
    <div className={styles.stockStatRow}>
      <span>{isEn ? "Open" : "開"} <b className={styles.up}>2240.00</b></span>
      <span>{isEn ? "High" : "高"} <b className={styles.up}>2255.00</b></span>
      <span>{isEn ? "Low" : "低"} <b className={styles.up}>2230.00</b></span>
    </div>
    <div className={styles.stockSubTabs2}>
      {(isEn ? ["Book", "Detail", "Intraday", "Ticks"] : ["五檔", "詳細", "分時", "分價"]).map(
        (t, i) => (
          <span key={t} className={i === 1 ? styles.subTabActive : ""}>
            {t}
          </span>
        )
      )}
    </div>
    <div className={styles.stockDetailGrid}>
      <span>{isEn ? "Last" : "成交"}</span>
      <b className={styles.down}>2180.00</b>
      <span>{isEn ? "Bid Vol" : "單量"}</span>
      <b>22</b>
      <span>{isEn ? "Change" : "漲跌"}</span>
      <b className={styles.down}>▼185.00</b>
      <span>{isEn ? "Prev Vol" : "昨量"}</span>
      <b>4276</b>
    </div>
    <div className={styles.stockBottomBar}>
      <button className={styles.bellBtn} onClick={onBell}>
        🔔
      </button>
      <button className={styles.iconBtn}>⊕</button>
      <button className={styles.iconBtn}>⚡</button>
      <button className={styles.orderBtn}>{isEn ? "Order" : "下單"}</button>
    </div>
  </div>
);

const PriceAlertDemo = () => {
  const { language } = useLanguage();
  const isEn = language === "English";
  const tsmcLabel = isEn ? TSMC_LABEL_EN : TSMC_LABEL_CH;

  const [flowKey, setFlowKey] = useState(1);

  // shared "backend" data across all flows
  const [conditions, setConditions] = useState(isEn ? SEED_EN : SEED_CH);
  const [checkedConditions, setCheckedConditions] = useState({}); // by condition id — independent
  const [checkedStocks, setCheckedStocks] = useState({}); // by stock name — for grouped manage lists
  const [expandedStock, setExpandedStock] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // { scope: 'conditions'|'stocks' }
  const [toast, setToast] = useState(false);

  // form state (shared)
  const [condition, setCondition] = useState("");
  const [value, setValue] = useState(2242);

  // Flow 1 state
  const [flow1Stage, setFlow1Stage] = useState("stock"); // 'stock' | 'alert'
  const [tab, setTab] = useState(0);

  // Flow 3 state
  const [flow3Stage, setFlow3Stage] = useState("stock"); // 'stock' | 'summary' | 'manage'
  const [flow3Stock, setFlow3Stock] = useState(null);
  const [flow3ShowAddCard, setFlow3ShowAddCard] = useState(false);

  // Flow 2 state
  const [flow2Stage, setFlow2Stage] = useState("stock"); // 'stock' | 'detail' | 'overview'
  const [flow2Stock, setFlow2Stock] = useState(null);
  const [flow2Fresh, setFlow2Fresh] = useState(true);
  const [overviewTab, setOverviewTab] = useState(1);

  const CONDITIONS = isEn ? CONDITIONS_EN : CONDITIONS_CH;
  const RECORDS = isEn ? RECORDS_EN : RECORDS_CH;

  const stockGroups = conditions.reduce((groups, c) => {
    if (!groups[c.stock]) groups[c.stock] = [];
    groups[c.stock].push(c);
    return groups;
  }, {});
  const stockNames = Object.keys(stockGroups);
  const hasCheckedStock = stockNames.some((s) => checkedStocks[s]);
  const hasCheckedCondition = (stock) =>
    (stockGroups[stock] || []).some((c) => checkedConditions[c.id]);

  const switchFlow = (key) => {
    setFlowKey(key);
    setTab(0);
    setFlow1Stage("stock");
    setFlow2Stage("stock");
    setFlow2Stock(null);
    setFlow2Fresh(true);
    setOverviewTab(1);
    setFlow3Stage("stock");
    setFlow3Stock(null);
    setFlow3ShowAddCard(false);
    setCondition("");
    setConfirmDelete(null);
    setExpandedStock(null);
    setCheckedStocks({});
    setCheckedConditions({});
  };

  const toggleConditionCheck = (id) => {
    setCheckedConditions((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const toggleStockCheck = (stock) => {
    setCheckedStocks((prev) => ({ ...prev, [stock]: !prev[stock] }));
  };

  const addCondition = (stockLabel) => {
    if (!condition || !stockLabel) return;
    const newItem = {
      id: `c${Date.now()}`,
      stock: stockLabel,
      conditionText: `${condition}${value}`,
      freq: isEn ? "Once daily" : "每日1次",
    };
    setConditions((prev) => [newItem, ...prev]);
    setToast(true);
    setTimeout(() => setToast(false), 1400);
    setCondition("");
  };

  const requestDeleteConditions = (stock) => {
    if (!hasCheckedCondition(stock)) return;
    setConfirmDelete({ scope: "conditions" });
  };
  const requestDeleteStocks = () => {
    if (!hasCheckedStock) return;
    setConfirmDelete({ scope: "stocks" });
  };
  const confirmDeleteYes = () => {
    if (confirmDelete?.scope === "conditions") {
      setConditions((prev) => prev.filter((c) => !checkedConditions[c.id]));
      setCheckedConditions({});
    } else if (confirmDelete?.scope === "stocks") {
      setConditions((prev) => prev.filter((c) => !checkedStocks[c.stock]));
      setCheckedStocks({});
    }
    setConfirmDelete(null);
  };

  // ---- shared: per-stock filtered condition list (independent checkboxes) ----
  const renderConditionsList = (stockLabel) => {
    const list = conditions.filter((c) => c.stock === stockLabel);
    return (
      <div className={styles.inlinePreview}>
        <div className={styles.manageHeader}>
          <span>
            {isEn ? "Set Conditions" : "已設定條件"} {list.length}
            {isEn ? "" : " 筆"}
          </span>
          <button
            className={styles.deleteBtn}
            disabled={!hasCheckedCondition(stockLabel)}
            onClick={() => requestDeleteConditions(stockLabel)}
          >
            🗑 {isEn ? "Delete" : "刪除"}
          </button>
        </div>
        <div className={styles.previewTableHead}>
          <span></span>
          <span>{isEn ? "Condition" : "觸發條件"}</span>
          <span>{isEn ? "Frequency" : "頻率/時間"}</span>
        </div>
        {list.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>☁</div>
            {isEn ? "No conditions set" : "還沒有設定任何條件"}
          </div>
        ) : (
          list.map((c) => (
            <label className={styles.previewRow} key={c.id}>
              <input
                type="checkbox"
                checked={!!checkedConditions[c.id]}
                onChange={() => toggleConditionCheck(c.id)}
              />
              <span className={styles.previewCondition}>{c.conditionText}</span>
              <span>{c.freq}</span>
            </label>
          ))
        )}
      </div>
    );
  };

  // ---- shared: the add/edit form ----
  const renderSettingForm = ({ stockLabel, onConfirm, onCancel, cardStyle, editableStock }) => (
    <div className={cardStyle ? styles.settingCard : styles.settingForm}>
      {cardStyle && (
        <div className={styles.cardTitle}>{isEn ? "Add Condition" : "新增條件"}</div>
      )}
      <div className={styles.fieldLabel}>{isEn ? "Select Product" : "選擇商品"}</div>
      {editableStock && !stockLabel ? (
        <div className={styles.stockFieldEmpty}>
          {isEn ? "Enter product name or code" : "請輸入商品名稱或代碼"} 🔍
        </div>
      ) : (
        <div className={styles.stockField}>
          <span>{stockLabel}</span>
          <span className={styles.stockPrice}>
            09:58 <b>2242.00</b> <span className={styles.up}>▲55.00 (2.52%)</span>
          </span>
        </div>
      )}

      <div className={styles.fieldLabel}>{isEn ? "Trigger Condition" : "觸發條件"}</div>
      <select
        className={styles.selectField}
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      >
        <option value="">{isEn ? "Please select a condition" : "請選擇條件"}</option>
        {CONDITIONS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {condition && (
        <>
          <div className={styles.fieldLabel}>{isEn ? "Condition Value" : "條件值"}</div>
          <div className={styles.stepperField}>
            <button onClick={() => setValue((v) => v - 1)}>−</button>
            <span>{value}</span>
            <button onClick={() => setValue((v) => v + 1)}>+</button>
          </div>
        </>
      )}

      <div className={styles.fieldLabel}>{isEn ? "Notify Until" : "通知直到"}</div>
      <div className={styles.dateField}>2026/09/06 📅</div>

      {onCancel ? (
        <div className={styles.formBtnRow}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            {isEn ? "Cancel" : "取消"}
          </button>
          <button className={styles.confirmBtn} disabled={!condition} onClick={onConfirm}>
            {isEn ? "Confirm" : "確認設定"}
          </button>
        </div>
      ) : (
        <button className={styles.confirmBtn} disabled={!condition} onClick={onConfirm}>
          {isEn ? "Confirm" : "確認設定"}
        </button>
      )}
    </div>
  );

  // ================= FLOW 1 =================
  const flow1Tabs = isEn
    ? ["Set Condition", "History", "Manage"]
    : ["條件設定", "通知紀錄", "通知管理"];
  const settingLabel = isEn ? "Set Condition" : "條件設定";
  const settingTabIndex = flow1Tabs.indexOf(settingLabel);
  const manageTabIndex = flow1Tabs.length - 1;
  const recordLabel = isEn ? "History" : "通知紀錄";

  const renderFlow1ManageList = () => (
    <div className={styles.manageList}>
      <div className={styles.findingBanner}>
        {isEn
          ? "⚠️ Finding: users entering from TSMC's quote page expected to see only TSMC in \"Manage\", but saw every stock mixed together."
          : "⚠️ 測試發現：使用者從台積電報價頁進入，卻在「通知管理」看到全部個股混在一起，原本預期只看到台積電。"}
      </div>
      <div className={styles.manageHeader}>
        <span>
          {isEn ? "Stocks Set" : "已設定個股"} {stockNames.length}
          {isEn ? "" : " 筆"}
        </span>
        <button className={styles.deleteBtn} disabled={!hasCheckedStock} onClick={requestDeleteStocks}>
          🗑
        </button>
      </div>
      {stockNames.map((stock) => (
        <div key={stock} className={styles.stockGroup}>
          <label className={styles.manageRow}>
            <input
              type="checkbox"
              checked={!!checkedStocks[stock]}
              onChange={() => toggleStockCheck(stock)}
            />
            <div className={styles.stockGroupMain}>
              <div className={styles.manageStock}>{stock}</div>
            </div>
            <button
              className={styles.countBadge}
              onClick={(e) => {
                e.preventDefault();
                setExpandedStock(expandedStock === stock ? null : stock);
              }}
            >
              {stockGroups[stock].length} {expandedStock === stock ? "︿" : "﹀"}
            </button>
            <button
              className={styles.editPencilBtn}
              onClick={(e) => {
                e.preventDefault();
                setTab(settingTabIndex);
                setExpandedStock(null);
              }}
            >
              ✎
            </button>
          </label>
          {expandedStock === stock && (
            <div className={styles.expandedConditions}>
              {stockGroups[stock].map((c) => (
                <div className={styles.expandedRow} key={c.id}>
                  {c.conditionText} · {c.freq}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderFlow1 = () => {
    if (flow1Stage === "stock") {
      return (
        <StockQuotePage
          isEn={isEn}
          stockLabel={tsmcLabel}
          onBell={() => {
            setFlow1Stage("alert");
            setTab(0);
          }}
        />
      );
    }
    const tabLabel = flow1Tabs[tab];
    return (
      <>
        <div className={styles.phoneHeader}>
          <span className={styles.backChevron} onClick={() => setFlow1Stage("stock")}>
            ‹
          </span>
          <span>{isEn ? "Price Alert" : "到價通知"}</span>
          <span className={styles.headerSpacer}></span>
        </div>
        <div className={styles.tabBar}>
          {flow1Tabs.map((t, i) => (
            <button
              key={t}
              className={tab === i ? styles.tabActive : styles.tab}
              onClick={() => setTab(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className={styles.phoneBody}>
          {tabLabel === settingLabel && (
            <>
              {renderSettingForm({
                stockLabel: tsmcLabel,
                onConfirm: () => addCondition(tsmcLabel),
              })}
              {renderConditionsList(tsmcLabel)}
            </>
          )}
          {tabLabel === recordLabel && (
            <div className={styles.recordList}>
              {RECORDS.map((r, i) => (
                <div className={styles.recordRow} key={i}>
                  <div className={styles.recordStock}>{r.stock}</div>
                  <div className={styles.recordNote}>{r.note}</div>
                  <div className={styles.recordTime}>{r.time}</div>
                </div>
              ))}
            </div>
          )}
          {tab === manageTabIndex && renderFlow1ManageList()}
        </div>
      </>
    );
  };

  // ================= FLOW 2 =================
  const renderFlow2Detail = () => (
    <>
      <div className={styles.phoneHeader}>
        {flow2Fresh ? (
          <span
            className={styles.closeX}
            onClick={() => setFlow2Stage("stock")}
          >
            ✕
          </span>
        ) : (
          <span
            className={styles.backChevron}
            onClick={() => {
              setFlow2Stage("overview");
              setOverviewTab(1);
            }}
          >
            ‹
          </span>
        )}
        <span>{flow2Fresh ? (isEn ? "Price Alert" : "到價通知") : (isEn ? "Stock Price Alert" : "個股到價通知")}</span>
        {flow2Fresh ? (
          <span
            className={styles.overviewLink}
            onClick={() => {
              setFlow2Stage("overview");
              setOverviewTab(1);
            }}
          >
            {isEn ? "Overview" : "總覽"}
          </span>
        ) : (
          <span className={styles.headerSpacer}></span>
        )}
      </div>
      <div className={styles.phoneBody}>
        {renderSettingForm({
          stockLabel: flow2Stock,
          editableStock: true,
          onConfirm: () => {
            const label = flow2Stock || tsmcLabel;
            if (!flow2Stock) setFlow2Stock(label);
            addCondition(label);
          },
        })}
        {flow2Stock && renderConditionsList(flow2Stock)}
      </div>
    </>
  );

  const renderFlow2Overview = () => (
    <>
      <div className={styles.phoneHeader}>
        <span className={styles.backChevron} onClick={() => setFlow2Stage("stock")}>
          ‹
        </span>
        <span>{isEn ? "Price Alert" : "到價通知"}</span>
        <span className={styles.headerSpacer}></span>
      </div>
      <div className={styles.tabBar}>
        <button
          className={overviewTab === 0 ? styles.tabActive : styles.tab}
          onClick={() => setOverviewTab(0)}
        >
          {recordLabel}
        </button>
        <button
          className={overviewTab === 1 ? styles.tabActive : styles.tab}
          onClick={() => setOverviewTab(1)}
        >
          {isEn ? "Manage" : "通知管理"}
        </button>
      </div>
      <div className={styles.phoneBody} style={{ paddingBottom: 64 }}>
        {overviewTab === 0 ? (
          <div className={styles.recordList}>
            {RECORDS.map((r, i) => (
              <div className={styles.recordRow} key={i}>
                <div className={styles.recordStock}>{r.stock}</div>
                <div className={styles.recordNote}>{r.note}</div>
                <div className={styles.recordTime}>{r.time}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.manageList}>
            <div className={styles.manageHeader}>
              <span>
                {isEn ? "Stocks Set" : "已設定個股"} {stockNames.length}
                {isEn ? "" : " 筆"}
              </span>
              <button className={styles.deleteBtn} disabled={!hasCheckedStock} onClick={requestDeleteStocks}>
                🗑
              </button>
            </div>
            {stockNames.map((stock) => (
              <label className={styles.manageRowClickable} key={stock}>
                <input
                  type="checkbox"
                  checked={!!checkedStocks[stock]}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleStockCheck(stock);
                  }}
                />
                <div className={styles.stockGroupMain}>
                  <div className={styles.manageStock}>{stock}</div>
                </div>
                <span
                  className={styles.chevronRow}
                  onClick={() => {
                    setFlow2Stock(stock);
                    setFlow2Fresh(false);
                    setFlow2Stage("detail");
                  }}
                >
                  {stockGroups[stock].length} ›
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
      <button
        className={styles.addStockBtn}
        onClick={() => {
          setFlow2Stock(null);
          setFlow2Fresh(true);
          setFlow2Stage("detail");
        }}
      >
        {isEn ? "Add Stock Price Alert" : "新增個股到價通知"}
      </button>
    </>
  );

  const renderFlow2 = () => {
    if (flow2Stage === "stock") {
      return (
        <StockQuotePage
          isEn={isEn}
          stockLabel={tsmcLabel}
          onBell={() => {
            setFlow2Stock(tsmcLabel);
            setFlow2Fresh(true);
            setFlow2Stage("detail");
          }}
        />
      );
    }
    if (flow2Stage === "detail") return renderFlow2Detail();
    return renderFlow2Overview();
  };

  // ================= FLOW 3 =================
  const renderFlow3Summary = () => {
    const list = conditions.filter((c) => c.stock === flow3Stock);
    const isFresh = list.length === 0;
    return (
      <>
        <div className={styles.phoneHeader}>
          {isFresh ? (
            <span className={styles.closeX} onClick={() => setFlow3Stage("stock")}>
              ✕
            </span>
          ) : (
            <span className={styles.backChevron} onClick={() => setFlow3Stage("stock")}>
              ‹
            </span>
          )}
          <span>{isEn ? "Price Alert" : "到價通知"}</span>
          <span className={styles.headerSpacer}></span>
        </div>
        <div className={styles.phoneBody} style={{ paddingBottom: 64 }}>
          {flow3Stock && <div className={styles.summaryStockTitle}>{flow3Stock}</div>}
          {flow3Stock && renderConditionsList(flow3Stock)}
          {!flow3Stock &&
            renderSettingForm({
              stockLabel: flow3Stock,
              cardStyle: true,
              editableStock: true,
              onConfirm: () => {
                const label = tsmcLabel;
                setFlow3Stock(label);
                addCondition(label);
              },
            })}
        </div>
        {!flow3ShowAddCard && flow3Stock && (
          <div className={styles.flow3FooterBtns}>
            <button className={styles.manageAllBtn} onClick={() => setFlow3Stage("manage")}>
              {isEn ? "Manage All Alerts" : "管理所有通知"}
            </button>
            <button className={styles.addConditionBtn} onClick={() => setFlow3ShowAddCard(true)}>
              {isEn ? "Add Condition" : "新增條件"}
            </button>
          </div>
        )}
        {flow3ShowAddCard && flow3Stock && (
          <div
            className={styles.cardOverlay}
            onClick={() => setFlow3ShowAddCard(false)}
          >
            <div
              className={styles.cardOverlayInner}
              onClick={(e) => e.stopPropagation()}
            >
              {renderSettingForm({
                stockLabel: flow3Stock,
                cardStyle: true,
                onCancel: () => setFlow3ShowAddCard(false),
                onConfirm: () => {
                  addCondition(flow3Stock);
                  setFlow3ShowAddCard(false);
                },
              })}
            </div>
          </div>
        )}
      </>
    );
  };

  const renderFlow3Manage = () => (
    <>
      <div className={styles.phoneHeader}>
        <span className={styles.backChevron} onClick={() => setFlow3Stage("stock")}>
          ‹
        </span>
        <span>{isEn ? "Manage Price Alerts" : "到價通知管理"}</span>
        <span className={styles.headerSpacer}></span>
      </div>
      <div className={styles.tabBar}>
        <button
          className={overviewTab === 0 ? styles.tabActive : styles.tab}
          onClick={() => setOverviewTab(0)}
        >
          {recordLabel}
        </button>
        <button
          className={overviewTab === 1 ? styles.tabActive : styles.tab}
          onClick={() => setOverviewTab(1)}
        >
          {isEn ? "Manage" : "通知管理"}
        </button>
      </div>
      <div className={styles.phoneBody} style={{ paddingBottom: 64 }}>
        {overviewTab === 0 ? (
          <div className={styles.recordList}>
            {RECORDS.map((r, i) => (
              <div className={styles.recordRow} key={i}>
                <div className={styles.recordStock}>{r.stock}</div>
                <div className={styles.recordNote}>{r.note}</div>
                <div className={styles.recordTime}>{r.time}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.manageList}>
            <div className={styles.manageHeader}>
              <span>
                {isEn ? "Stocks Set" : "已設定個股"} {stockNames.length}
                {isEn ? "" : " 筆"}
              </span>
              <button className={styles.deleteBtn} disabled={!hasCheckedStock} onClick={requestDeleteStocks}>
                🗑
              </button>
            </div>
            {stockNames.map((stock) => (
              <label className={styles.manageRowClickable} key={stock}>
                <input
                  type="checkbox"
                  checked={!!checkedStocks[stock]}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleStockCheck(stock);
                  }}
                />
                <div className={styles.stockGroupMain}>
                  <div className={styles.manageStock}>{stock}</div>
                </div>
                <span className={styles.countBadgeStatic}>{stockGroups[stock].length}</span>
                <button
                  className={styles.editPencilBtn}
                  onClick={() => {
                    setFlow3Stock(stock);
                    setFlow3ShowAddCard(false);
                    setFlow3Stage("summary");
                  }}
                >
                  ✎
                </button>
              </label>
            ))}
          </div>
        )}
      </div>
      <button
        className={styles.addStockBtn}
        onClick={() => {
          setFlow3Stock(null);
          setFlow3ShowAddCard(false);
          setFlow3Stage("summary");
        }}
      >
        {isEn ? "Add Stock Alert" : "新增個股通知"}
      </button>
    </>
  );

  const renderFlow3 = () => {
    if (flow3Stage === "stock") {
      return (
        <StockQuotePage
          isEn={isEn}
          stockLabel={tsmcLabel}
          onBell={() => {
            setFlow3Stock(tsmcLabel);
            setFlow3ShowAddCard(false);
            setFlow3Stage("summary");
          }}
        />
      );
    }
    if (flow3Stage === "manage") return renderFlow3Manage();
    return renderFlow3Summary();
  };

  const FLOWS_META = {
    1: { label: "Flow 1", subtitle: isEn ? "Enter from stock quote" : "三個頁籤" },
    2: { label: "Flow 2", subtitle: isEn ? "Enter from overview" : "將訊息頁面獨立" },
    3: { label: "Flow 3", subtitle: isEn ? "Add-condition card" : "另開視窗新增條件" },
  };

  return (
    <div className={styles.demoOuter}>
      <div className={styles.flowSwitcher}>
        {[1, 2, 3].map((key) => (
          <button
            key={key}
            className={flowKey === key ? styles.flowBtnActive : styles.flowBtn}
            onClick={() => switchFlow(key)}
          >
            <div>{FLOWS_META[key].label}</div>
            <div className={styles.flowBtnSub}>{FLOWS_META[key].subtitle}</div>
          </button>
        ))}
      </div>

      <div className={styles.phoneFrame}>
        {flowKey === 1 && renderFlow1()}
        {flowKey === 2 && renderFlow2()}
        {flowKey === 3 && renderFlow3()}

        {toast && (
          <div className={styles.toast}>{isEn ? "Added successfully" : "加入成功"}</div>
        )}

        {confirmDelete && (
          <div className={styles.confirmOverlay}>
            <div className={styles.confirmCard}>
              <div className={styles.confirmIcon}>!</div>
              <div className={styles.confirmText}>
                {isEn ? "Delete the selected alerts?" : "確定要刪除所選的個股通知嗎？"}
              </div>
              <div className={styles.confirmActions}>
                <button onClick={() => setConfirmDelete(null)}>
                  {isEn ? "Cancel" : "取消"}
                </button>
                <button className={styles.confirmDeleteBtn} onClick={confirmDeleteYes}>
                  {isEn ? "Delete" : "刪除"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {flowKey === 3 && (
        <div className={styles.finalNote}>
          {isEn
            ? "✅ What most testers ultimately preferred: everything on one focused screen."
            : "✅ 多數受測者最終選擇：資訊集中、單一畫面完成設定。"}
        </div>
      )}
      <div className={styles.demoCaption}>
        {isEn
          ? "Switch between the three flows above, then try setting and deleting a condition in each."
          : "上面可以切換三版動線，再試著在每一版裡設定、刪除一筆條件感受差異。"}
      </div>
    </div>
  );
};

export default PriceAlertDemo;
