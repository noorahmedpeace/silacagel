/**
 * DryBot conversation log → Google Sheet.
 * Every visitor question + DryBot's answer lands in a "Conversations" tab so you
 * can track what people ask, filter by session (a full chat), and spot questions
 * the bot couldn't answer (Unanswered = YES → add that topic to the site).
 *
 * SETUP (5 minutes):
 * 1. Create a new Google Sheet  (sheets.new)
 * 2. Extensions → Apps Script. Delete any code, paste ALL of this, Save.
 * 3. Deploy → New deployment → type "Web app"
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Deploy → Authorize → copy the "Web app URL".
 * 4. In Vercel → Project → Settings → Environment Variables, add:
 *      CHAT_LOG_URL = <that Web app URL>   (Production + Preview)
 *    then redeploy (Deployments → ⋯ → Redeploy).
 *
 * That's it — open the sheet any time to read live conversations.
 */
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Conversations') || ss.insertSheet('Conversations');
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Time', 'Session', 'Question', 'Answer', 'Sources', 'Unanswered']);
    sh.setFrozenRows(1);
  }
  sh.appendRow([
    data.time || '',
    data.session || '',
    data.question || '',
    data.answer || '',
    (data.sources || []).join(', '),
    data.unanswered ? 'YES' : ''
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
