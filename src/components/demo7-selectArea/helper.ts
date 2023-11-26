import { initSelectArea } from "./selector";

export enum StartSelectEnum {
  // 选取
  areaSelect = 'areaSelect',

  // 截屏
  screenShot = 'screenShot',
}

export const GLOBAL_EVENTS = {
  SHOW_BOARD: 'global/show-board',
  CLOSE_BOARD: 'global/close-board',
  GET_PAGE_HTML: 'global/get-page-html',
  START_SELECT: 'global/start-select',
  SAVE_TO_NOTE: 'global/save-to-note',
};


/**
 * 开始选择需要剪藏的内容
 */
export const startSelect = (type: StartSelectEnum) => {
  /*
  getCurrentTab().then(tab => {
    Chrome.tabs.sendMessage(tab.id as number, {
      action: GLOBAL_EVENTS.START_SELECT,
      data: {
        type,
      },
    });
  });
  */
  startSelectUtil({ type });
};

const startSelectUtil = (data: { type: StartSelectEnum }) => {
  initSelectArea(data);
  // this.iframe?.classList.remove('show');
}