import { PropType } from 'vue';
import { any } from 'vue-types';

export interface BasicProps {
  width: string;
  height: string;
}
export const basicProps = {
  width: {
    type: String as PropType<string>,
    default: '100%',
  },
  height: {
    type: String as PropType<string>,
    default: '460px',
  },
};

export const  deviceMsgProps = {
  width: {
    type: String as PropType<string>,
    default: '100%',
  },
  height: {
    type: String as PropType<string>,
    default: '460px',
  },
  startDate: {
    type: String, 
  },
  endDate: {
    type: String,
  },
};
