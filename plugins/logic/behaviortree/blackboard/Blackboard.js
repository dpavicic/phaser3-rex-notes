import Base from './Base.js';
import { TREE_STATE, CURRENT_TIME } from '../constants.js';

class Blackboard extends Base {
    getTreeState(treeID) {
        return this.get(TREE_STATE, treeID);
    }

    setCurrentTime(time) {
        this.set(CURRENT_TIME, time);
    }

};

export default Blackboard;