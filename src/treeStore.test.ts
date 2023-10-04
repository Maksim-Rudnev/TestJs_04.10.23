import TreeStore from './main';

interface TreeItem {
  id: number | string;    
  parent: number | string; 
  type?: unknown;        
}

describe('TreeStore', () => {
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
  const ts = new TreeStore(items);
  it('должен возвращать все элементы дерева', () => {
    expect(ts.getAll()).toEqual(items);
  });

  it('должен возвращать элемент по заданному id', () => {
    expect(ts.getItem(7)).toEqual(items[6]);
  });

  it('должен возвращать детей элемента', () => {
    expect(ts.getChildren(4)).toEqual([items[6], items[7]]);
  });

  it('должен возвращать всех детей элемента (включая вложенных детей)', () => {
    expect(ts.getAllChildren(2)).toEqual([items[3], items[4], items[5], items[6], items[7]]);
  });

  it('должен возвращать всех родителей элемента (включая родителей родителей)', () => {
    expect(ts.getAllParents(7)).toEqual([items[3], items[1], items[0]]);
  });
});
