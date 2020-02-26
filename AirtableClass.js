const apiKey = "";
const baseId = "";
const tableName = "";
const viewId = "";

class AirtableBase {
  constructor(apiKey, baseId, tableName, viewId) {
    this._apiKey = apiKey;
    this._baseId = baseId;
    this._tableName = tableName;
    this._viewId = viewId;
  }

  getAirtableDataObject() {
    let offset = 0;
    let records = [];
    while (offset !== null) {
      let url = `https://api.airtable.com/v0/${this._baseId}/${encodeURIComponent(this._tableName)}?api_key=${this._apiKey}&view=${this._viewId}&offset=${offset}`;
      let options = { "method" : "GET" };
      let response = JSON.parse(UrlFetchApp.fetch(url, options));
      records.push.apply(records, response.records);
      Utilities.sleep(200);
      response.offset ? offset = response.offset : offset = null;
    }
    return records;
  }
}
