interface TreeItem {
  id: number | string;    
  parent: number | string; 
  type?: unknown;        
}

export default class TreeStore {
  private items: TreeItem[];
  private itemIndex: { [id: string]: TreeItem };
  private parentIndex: { [parentId: string]: TreeItem[] };

  // Конструктор класса, принимает массив элементов и инициализирует индексы.
  constructor(items: TreeItem[]) {
    this.items = items;
    this.itemIndex = {};
    this.parentIndex = {};

    // Построение индексов при инициализации
    for (const item of items) {
      this.itemIndex[item.id.toString()] = item; // Индекс элементов по id
      if (!this.parentIndex[item.parent.toString()]) {
        this.parentIndex[item.parent.toString()] = [];
      }
      this.parentIndex[item.parent.toString()].push(item); // Индекс детей элементов по parentId
    }
  }

  // Метод возвращает все элементы дерева.
  getAll(): TreeItem[] {
    return this.items;
  }

  // Метод возвращает элемент по заданному id.
  getItem(id: number | string): TreeItem | undefined {
    return this.itemIndex[id.toString()];
  }

  // Метод возвращает детей элемента с заданным id.
  getChildren(id: number | string): TreeItem[] {
    return this.parentIndex[id.toString()] || [];
  }

  // Метод возвращает всех детей элемента с заданным id (включая вложенных детей).
  getAllChildren(id: number | string): TreeItem[] {
    const result: TreeItem[] = [];
    const stack: TreeItem[] = this.getChildren(id);

    while (stack.length > 0) {
      const currentItem = stack.shift();
      if (currentItem !== undefined) {
        result.push(currentItem);
        const children = this.getChildren(currentItem.id);
        if (children.length > 0) {
          stack.push(...children);
        }
      }
    }

    return result;
  }

  // Метод возвращает всех родителей элемента с заданным id (включая родителей родителей).
  getAllParents(id: number | string): TreeItem[] {
    const result: TreeItem[] = [];
    const pivotItem = this.getItem(id);

    // Проверяем существование элемента с заданным id
    if (pivotItem) {
      let currentItem = this.getItem(pivotItem.parent);

      // Итерируемся по родительским элементам и добавляем их в результат
      while (currentItem) {
        result.push(currentItem);
        currentItem = this.getItem(currentItem.parent);
      }
    }

    return result;
  }
}

const items: TreeItem[] = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },
  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },
  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];
