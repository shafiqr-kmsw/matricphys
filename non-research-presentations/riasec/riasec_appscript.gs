// ============================================================
// RIASEC Career Interest Assessment — Google Apps Script
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Open your Google Sheet → Extensions → Apps Script
// 2. Replace all code with this file → Save (Ctrl+S)
// 3. Click Deploy → New Deployment
//    · Type:            Web App
//    · Execute as:      Me
//    · Who has access:  Anyone
// 4. Click Deploy → Copy the Web App URL
// 5. Paste the URL into riasec_webapp.html:
//    const APPS_SCRIPT_URL = "PASTE_URL_HERE";
// 6. On first run, click "Review Permissions" and authorize.
// ============================================================

const HEADERS = [
  "Timestamp",
  "Student Name",
  "Class / Section",
  "Score R (Realistic)",
  "Score I (Investigative)",
  "Score A (Artistic)",
  "Score S (Social)",
  "Score E (Enterprising)",
  "Score C (Conventional)",
  "Interest Code",
  "All Matched Broad Fields",
  "Top Broad Field(s)",
  "Top Narrow Field(s)",
  "Top Detailed Field(s)",
  "SD1 – Alone vs With Others (1–7)",
  "SD2 – Structured vs Flexible (1–7)",
  "SD3 – Indoor vs Outdoor (1–7)",
  "SD4 – Data/Things vs People (1–7)",
  "SD5 – Creative vs Analytical (1–7)",
  "SD6 – Physical vs Intellectual (1–7)",
  "SD1 Label",
  "SD2 Label",
  "SD3 Label",
  "SD4 Label",
  "SD5 Label",
  "SD6 Label"
];

// ============================================================
// doPost — receives JSON payload from the HTML webapp
// ============================================================
function doPost(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("RIASEC Results") || createResultsSheet(ss);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      styleHeaderRow(sheet);
    }

    const data = JSON.parse(e.postData.contents);
    const sd   = data.semantic      || {};
    const sdL  = data.semanticLabels || {};

    const row = [
      formatTimestamp(data.timestamp),
      data.name              || "",
      data.studentClass      || "",
      data.scores.R          || 0,
      data.scores.I          || 0,
      data.scores.A          || 0,
      data.scores.S          || 0,
      data.scores.E          || 0,
      data.scores.C          || 0,
      data.interestCode      || "",
      data.allBroadFields    || "",
      data.topBroadFields    || "",
      data.topNarrowFields   || "",
      data.topDetailedFields || "",
      sd.sd1 || "",
      sd.sd2 || "",
      sd.sd3 || "",
      sd.sd4 || "",
      sd.sd5 || "",
      sd.sd6 || "",
      sdL.sd1_label || "",
      sdL.sd2_label || "",
      sdL.sd3_label || "",
      sdL.sd4_label || "",
      sdL.sd5_label || "",
      sdL.sd6_label || ""
    ];

    sheet.appendRow(row);

    // Alternate row shading for readability
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const rowRange = sheet.getRange(lastRow, 1, 1, HEADERS.length);
      rowRange.setBackground(lastRow % 2 === 0 ? "#f0f4f7" : "#ffffff");
    }

    try { sheet.autoResizeColumns(1, HEADERS.length); } catch(e) {}

    return jsonResponse({ status: "success", message: "Data saved." });

  } catch (err) {
    Logger.log("doPost error: " + err.message);
    return jsonResponse({ status: "error", message: err.message });
  }
}

// ============================================================
// doGet — simple connectivity test
// ============================================================
function doGet(e) {
  return jsonResponse({
    status: "ok",
    message: "RIASEC Apps Script is live. POST to submit student results."
  });
}

// ============================================================
// HELPER — create and style the results sheet
// ============================================================
function createResultsSheet(ss) {
  return ss.insertSheet("RIASEC Results");
}

function styleHeaderRow(sheet) {
  const range = sheet.getRange(1, 1, 1, HEADERS.length);
  range
    .setBackground("#0d3b4f")
    .setFontColor("#ffffff")
    .setFontWeight("bold")
    .setFontSize(10)
    .setWrap(true);
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 40);
}

function formatTimestamp(iso) {
  try { return iso ? new Date(iso) : new Date(); }
  catch(e) { return new Date(); }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// testSubmission — run manually from the Apps Script editor
// to verify everything is working before connecting the app
// ============================================================
function testSubmission() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp:         new Date().toISOString(),
        name:              "Test Student",
        studentClass:      "Grade 11 — STEM A",
        scores:            { R:5, I:4, A:2, S:3, E:6, C:7 },
        interestCode:      "CEI",
        allBroadFields:    "04 Business, administration and law, 07 Engineering, manufacturing & construction",
        topBroadFields:    "04 Business, administration and law",
        topNarrowFields:   "041 Business and management, 042 Law",
        topDetailedFields: "Finance, banking and insurance, Management and administration, Law",
        semantic: { sd1:3, sd2:2, sd3:5, sd4:4, sd5:6, sd6:3 },
        semanticLabels: {
          sd1_label: "Prefer working alone [3] Prefer working with others",
          sd2_label: "Prefer structured routines [2] Prefer flexible work",
          sd3_label: "Prefer indoor settings [5] Prefer outdoor / field settings",
          sd4_label: "Prefer working with data/things [4] Prefer working with people",
          sd5_label: "Prefer creative expression [6] Prefer logical analysis",
          sd6_label: "Prefer hands-on / physical work [3] Prefer intellectual / mental work"
        }
      })
    }
  };

  const result = doPost(mockEvent);
  Logger.log("Test result: " + result.getContent());
}
