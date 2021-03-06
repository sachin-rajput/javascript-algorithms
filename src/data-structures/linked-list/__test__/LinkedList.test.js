import LinkedList from "../LinkedList";

describe("LinkedList", () => {
  it("should create a list with default comparator function", () => {
    const list = new LinkedList();

    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.toString()).toBe("");
  });

  it("should create a list and prepend a node with a value", () => {
    const list = new LinkedList();
    list.prepend(2);

    expect(list.head.value).toBe(2);
    expect(list.toString()).toBe("2");
  });

  it("should create a list and append a node with a value", () => {
    const list = new LinkedList();
    list.prepend(1);
    list.append(4);

    expect(list.tail.value).toBe(4);
    expect(list.toString()).toBe("1 4");
  });

  it("should create a list and delete first occurence", () => {
    const list = new LinkedList();
    list
      .append(2)
      .append(3)
      .append(4)
      .append(6)
      .append(4);
    const deletedNode = list.delete(4);

    expect(deletedNode.value).toBe(4);
    expect(list.tail.value).toBe(4);
    expect(list.toString()).toBe("2 3 6 4");
  });

  it("should create a list and delete tail", () => {
    const list = new LinkedList();
    list
      .append(2)
      .append(3)
      .append(4)
      .append(6)
      .append(14);
    const deletedNode = list.delete(14);
    const deletedNoNode = list.delete(15);

    expect(deletedNode.value).toBe(14);
    expect(deletedNoNode).toBeNull();
    expect(list.toString()).toBe("2 3 4 6");
  });

  it("should create a list and delete the head", () => {
    const list = new LinkedList().fromArray([1, 5, 67]);

    const delete1 = list.deleteHead();
    const delete2 = list.deleteHead();

    expect(list.head.value).toBe(67);
    expect(delete1.value).toBe(1);
    expect(delete2.value).toBe(5);

    const lastNode = list.deleteHead();

    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(lastNode.value).toBe(67);
  });

  it("should create a list and delete the tail", () => {
    const list = new LinkedList().fromArray([1, 5, 67]);

    const delete1 = list.deleteTail();
    const delete2 = list.deleteTail();

    expect(list.tail.value).toBe(1);
    expect(delete1.value).toBe(67);
    expect(delete2.value).toBe(5);

    const lastNode = list.deleteTail();

    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(lastNode.value).toBe(1);
  });

  it("should create a list and delete all", () => {
    const list = new LinkedList().fromArray([1, 1, 4, 6, 5, 6, 67, 6]);

    list.deleteAll(1);
    list.deleteAll(6);

    expect(list.toString()).toBe("4 5 67");
    expect(list.head.value).toBe(4);
    expect(list.head.next.value).toBe(5);
    expect(list.head.next.next.value).toBe(67);

    list.deleteTail();
    list.deleteTail();
    let lastNode = list.deleteTail();

    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(lastNode.value).toBe(4);

    list.deleteAll(6);
    expect(list.head).toBeNull();

    lastNode = list.delete(41);
    expect(lastNode).toBeNull();

    lastNode = list.deleteHead();
    expect(lastNode).toBeNull();

    lastNode = list.deleteTail();
    expect(lastNode).toBeNull();

    list
      .append(5)
      .append(7)
      .append(8);

    list.deleteTail(list.tail, list.head.next);
    expect(list.tail.value).toBe(7);
  });

  it("should create a list with custom comparator function", () => {
    function customComparator(a, b) {
      if (a.key === b) return 0;

      return a.key < b ? -1 : 1;
    }

    const list = new LinkedList(customComparator);

    list
      .append({ key: 2, value: "obj 2.1" })
      .append({ key: 3, value: "obj 3" })
      .append({ key: 2, value: "obj 2.2" })
      .append({ key: 2, value: "obj 2" });

    const deletedNode = list.delete(2);

    expect(list.head.value.value).toBe("obj 3");
    expect(deletedNode.value.value).toBe("obj 2.1");
  });

  it("should create a list and find the first match with the value", () => {
    const list = new LinkedList();
    list
      .append(1)
      .append(3)
      .append(45);

    const findItem1 = list.find({ value: 54 });
    const findItem2 = list.find({ value: 45 });

    expect(findItem1).toBeNull();
    expect(findItem2.value).toBe(45);
  });

  it("should create a list and find the first match using the callback", () => {
    const list = new LinkedList();
    list
      .append({ key: 2, text: "this is 2" })
      .append({ key: 4, text: "this is 4" })
      .append({ key: 6, text: "this is 6" });

    const findItem1 = list.find({ callback: value => value.key === 2 });

    expect(findItem1.value.text).toBe("this is 2");
  });

  it("should create a list and use a custom toString function", () => {
    const list = new LinkedList();
    list.append({ key: 1, text: "Hello 1" }).append({ key: 2, text: "Hello 2" });

    const printFunction = value => `${value.text}`;
    const nodeStringifier = value => `${value.key}:${value.text}`;

    expect(list.toString({ separator: ",", callback: printFunction })).toBe("Hello 1,Hello 2");
    expect(list.toString({ separator: "|", callback: nodeStringifier })).toBe("1:Hello 1|2:Hello 2");
  });

  it("should create a list from an array", () => {
    const list = new LinkedList();

    list.fromArray([]);
    expect(list.head).toBeNull();
    const input = [1, 2, 3, 4];
    list.fromArray(input);

    expect(list.head.value).toBe(1);
    expect(list.toString()).toBe("1 2 3 4");
  });

  it("should create a list and use a toArray to convert to array", () => {
    const list = new LinkedList();
    list.append({ key: 1, text: "Hello 1" }).append({ key: 2, text: "Hello 2" });

    const arr = list.toArray();

    expect(arr[0].value.key).toBe(1);
    expect(arr[1].value.text).toBe("Hello 2");
  });

  it("should create a list and reverse it", () => {
    const list = new LinkedList().fromArray([1, 3, 5, 6]);

    list.reverse();

    expect(list.toString()).toBe("6 5 3 1");
  });
});
