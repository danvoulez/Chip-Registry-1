export const API_BASE = '/api';

export const endpoints = {
  worlds: `${API_BASE}/worlds`,
  chips: `${API_BASE}/chips`,
  runsPlan: `${API_BASE}/runs/plan`,
  runsExecute: `${API_BASE}/runs/execute`,
  runsEvents: (runId: string) => `${API_BASE}/runs/${runId}/events`,
  receipts: (receiptCid: string) => `${API_BASE}/receipts/${receiptCid}`,
  explore: `${API_BASE}/explore`,
  verify: `${API_BASE}/verify`,
  actionsVary: `${API_BASE}/actions/vary`,
  actionsRemix: `${API_BASE}/actions/remix`,
  actionsBattle: `${API_BASE}/actions/battle_test`,
  replay: `${API_BASE}/replay`,
  mintConferenceStart: `${API_BASE}/mint/conference/start`,
  mintConferenceGet: (id: string) => `${API_BASE}/mint/conference/${id}`,
  mintSign: `${API_BASE}/mint/sign`,
  mintPublish: `${API_BASE}/mint/publish`,
  aliasSet: `${API_BASE}/aliases/set`
};
