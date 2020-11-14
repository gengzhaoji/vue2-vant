import Vue from 'vue'

import {
    Lazyload, Swipe, SwipeItem, Col, Row, Field, Tag, Button, RadioGroup, Radio, Loading, Overlay, Cell, CellGroup, Collapse, CollapseItem, Icon
} from 'vant'

Vue.use(Col);
Vue.use(Row);
Vue.use(Field);
Vue.use(Tag);
Vue.use(Button);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Loading);
Vue.use(Overlay);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload, {
    lazyComponent: true
});

export default Vue