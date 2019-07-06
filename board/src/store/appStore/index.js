var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// import * as chamberStore from '../chamberStore';
// import * as sensorStore from '../sensorStore';
// import * as processStore from '../processStore';
// import * as traceLevelStore from '../traceLevelStore';
// import * as traceStore from '../traceStore';
import { action, spy } from 'mobx';
//
// export const namespace = 'app';
// export const actionTypes = {
//   FETCH_ALL: `${namespace}/FETCH_ALL`,
//   RESTORE: `${namespace}/FETCH_ALL`,
// };
//
//
// export const store = {
//   namespaced: false,
//   actions: {
//     [actionTypes.FETCH_ALL]({ dispatch }) {
//       dispatch(chamberStore.actionTypes.FETCH_ALL);
//       dispatch(sensorStore.actionTypes.FETCH_ALL);
//       dispatch(processStore.actionTypes.FETCH_ALL);
//       dispatch(traceLevelStore.actionTypes.FETCH_ALL);
//       dispatch(traceStore.actionTypes.UPDATE_DIFF);
//     },
//   },
// };
//
spy((event) => {
    if (event.type === 'action') {
        console.log(`${event.name} with args: ${event.arguments}`);
    }
});
class AppStore {
    constructor() {
        this.fetchAll = () => {
        };
    }
}
__decorate([
    action
], AppStore.prototype, "fetchAll", void 0);
const store = new AppStore();
export default store;
