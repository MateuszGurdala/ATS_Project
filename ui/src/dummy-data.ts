import {TreeNode} from './types/tree-node';

export const DUMMY_YEARS: number[] = [2016, 2017, 2018, 2019, 2020, 2023, 2024, 2025];

export const DUMMY_AREAS: { [key: number]: TreeNode[] } = {
  2016: [
    {
      name: 'Kabaty',
      children: [
        {
          name: 'Dembego',
        },
      ],
    },
    {
      name: 'Natolin',
      children: [
        {
          name: 'Belgradzka',
        },
      ],
    },
  ]
}
