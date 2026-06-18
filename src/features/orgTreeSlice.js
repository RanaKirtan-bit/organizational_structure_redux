import { createSlice } from "@reduxjs/toolkit";

let idCounter = 1;
const initialState = {
  tree: {
    id: 1,
    title: "Director",
    type: "director",
    path: "",
    childCounter: 0,
    memberCounter: 0,
    subordinateCounter: 0,
    children: [],
  },
};

const updateNode = (node, parentId, callback) => {
  if (node.id === parentId) {
    return callback(node);
  }

  return {
    ...node,
    children: node.children.map((child) =>
      updateNode(child, parentId, callback)
    ),
  };
};

const removeNode = (node, nodeId) => ({
  ...node,
  children: node.children
    .filter((child) => child.id !== nodeId)
    .map((child) => removeNode(child, nodeId)),
});

const orgTreeSlice = createSlice({
  name: "orgTree",
  initialState,

  reducers: {
    addNode: (state, action) => {
      const parentId = action.payload;

      state.tree = updateNode(state.tree, parentId, (node) => {
        let newNode;

        if (node.type === "director") {
          const nextNumber = node.childCounter + 1;

          newNode = {
            id: ++idCounter,
            title: `Subordinate ${nextNumber}`,
            type: "subordinate",
            path: `${nextNumber}`,
            childCounter: 0,
            memberCounter: 0,
            subordinateCounter: 0,
            isNew: true,
            children: [],
          };
        } else {
          const nextNumber = node.childCounter + 1;

          newNode = {
            id: ++idCounter,
            title: `Branch Member ${node.path}/${nextNumber}`,
            type: "member",
            path: `${node.path}/${nextNumber}`,
            childCounter: 0,
            memberCounter: 0,
            subordinateCounter: 0,
            isNew: true,
            children: [],
          };
        }
        return {
          ...node,
          childCounter: node.childCounter + 1,
          children: [...node.children, newNode],
        };
      });
    },

    addBranchMember: (state, action) => {
      const parentId = action.payload;

      state.tree = updateNode(state.tree, parentId, (node) => {
        const nextNumber = node.memberCounter + 1;
        console.log(nextNumber);
        

        const member = {
          id: ++idCounter,
          title: `Branch Member ${node.path}/${nextNumber}`,
          type: "member",
          path: `${node.path}/${nextNumber}`,
          childCounter: 0,
          memberCounter: 0,
          subordinateCounter: 0,
          isNew: true,
          children: [],
        };

        return {
            ...node, 
            memberCounter: nextNumber, 
            children: [...node.children, member],
        };
      });
    },

    addSubBranchMember: (state, action) => {
      const parentId = action.payload;

      state.tree = updateNode(state.tree, parentId, (node) => {
        const nextNumber = node.memberCounter + 1;

        const member = {
          id: ++idCounter,
          title: `Branch Member ${node.path}/${nextNumber}`,
          type: "member",
          path: `${node.path}/${nextNumber}`,
          childCounter: 0,
          memberCounter: 0,
          subordinateCounter: 0,
          isNew: true,
          children: [],
        };

        return {
            ...node, 
            memberCounter: nextNumber, 
            children: [...node.children, member],
        };
      });
    },

    addSubordinateBranch: (state, action) => {
      const parentId = action.payload;

      state.tree = updateNode(state.tree, parentId, (node) => {
        const nextNumber = node.subordinateCounter + 1;

        const subordinate = {
          id: ++idCounter,
          title: `Subordinate ${node.path}/${nextNumber}`,
          type: "subordinate",
          path: `${node.path}/${nextNumber}`,
          childCounter: 0,
          memberCounter: 0,
          subordinateCounter: 0,
          isNew: true,
          children: [],
        };

        return {
            ...node, 
            subordinateCounter: nextNumber, 
            children: [...node.children, subordinate],
        };
      });
    },

    deleteNode: (state, action) => {
      state.tree = removeNode(state.tree, action.payload);
    }
  },
});

export const {addNode, addBranchMember, addSubBranchMember, addSubordinateBranch, deleteNode} = orgTreeSlice.actions;
export default orgTreeSlice.reducer;
