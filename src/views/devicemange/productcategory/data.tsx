import { ref, unref } from 'vue';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormSchema } from '/@/components/Table';
import { usePrdCategoryStore } from '/@/store/modules/productcategory';
import { RuleObject } from 'ant-design-vue/es/form/interface';
const prdCategoryStore = usePrdCategoryStore();
let parentCode: string = ref('');
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '分类ID',
      dataIndex: 'CategoryId',
      fixed: 'left',
      align: 'left',
      width: 200,
    },
    {
      title: '标识',
      dataIndex: 'Code',
      align: 'left',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    },
    {
      title: '分类名称',
      align: 'left',
      dataIndex: 'CategoryName',
    },
    {
      title: '描述',
      align: 'left',
      dataIndex: 'Remark',
      width: 150,
      sorter: true,
    },
  ];
}

export function getTreeTableData() {
  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        CategoryId: `${index}`,
        CategoryCode: 'John Brown',
        CategoryName: `1${index}`,
        Describe: `${index + 10}`,
        children: [
          {
            CategoryId: `l2-${index}`,
            CategoryCode: 'John Brown',
            CategoryName: `1${index}`,
            Describe: `${index + 10}`,
            children: [
              {
                CategoryId: `l2-${index}`,
                CategoryCode: 'John Brown',
                CategoryName: `1${index}`,
                Describe: `${index + 10}`,
              },
            ],
          },
        ],
      });
    }
    return arr;
  })();

  return data;
}

async function validateCode(code: string) {
  const data = await prdCategoryStore.validateApi({
    model: {
      code: code,
      categoryId: unref(parentCode),
    },
  });
  return data;
}

export function setId(code: string) {
  parentCode = code;
}

export const productCategoryFormSchema: FormSchema[] = [
  {
    field: 'CategoryId',
    label: '分类ID',
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
  },
  {
    field: 'Code',
    label: '分类标识',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入分类标识',
      },
      {
        validator: async (rule: RuleObject, value: string) => {
          const data = await validateCode(value);
          if (data?.Result == false) {
            return Promise.reject(data?.Msg);
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
  },
  {
    label: '分类名称',
    field: 'CategoryName',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入分类名称',
      },
    ],
  },

  {
    label: '描述',
    field: 'Remark',
    component: 'InputTextArea',
  },
];
