import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  addNode,
  addBranchMember,
  addSubordinateBranch,
  addSubBranchMember,
  deleteNode,
} from "../features/orgTreeSlice";

export default function TreeNode({ node, isRoot = false }) {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const members = node.children.filter(
    (child) => child.type === "member"
  );

  const subordinates = node.children.filter(
    (child) => child.type === "subordinate"
  );

  const styles = {
    director: {
      card: `
      bg-gradient-to-br
      from-slate-900
      via-slate-800
      to-slate-700
      text-white
      border-slate-600
      
    `,
      container: "bg-slate-50 border-slate-200",
      icon: "👔",
    },

    subordinate: {
      card: `
      bg-gradient-to-br
      from-emerald-600
      via-emerald-700
      to-teal-700
      text-white
      border-emerald-500
    `,
      container: "bg-emerald-50 border-emerald-200",
      icon: "🧑‍💼",
    },

    member: {
      card: `
      bg-gradient-to-br
      from-white
      to-slate-50
      text-slate-800
      border-slate-200
    `,
      container: "bg-slate-50 border-slate-200",
      icon: "👤",
    },
  };

  const style = styles[node.type];

  return (
    <div className="w-full">
      <div
  className={`
    relative overflow-hidden
    border rounded-3xl p-5
    backdrop-blur-xl
    shadow-lg
    hover:shadow-2xl
    hover:-translate-y-1
    transition-all duration-300
    ${style.card}
    ${node.isNew ? "new-node ring-4 ring-yellow-300" : ""}
  `}
>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div
  className="
  w-14 h-14
  rounded-full
  bg-white/20
  backdrop-blur-md
  flex items-center justify-center
  text-2xl
  shadow-lg
"
>
              {style.icon}
            </div>

            <div>
              <h3 className="font-bold text-lg">{node.title}</h3>
              <p className="text-sm opacity-80">
                {node.type.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {node.type === "subordinate" && (
              <button
                onClick={() =>
                  dispatch(addBranchMember(node.id))
                }
                className="
w-8 h-8
rounded-full
text-xl
flex justify-center items-center
bg-white
text-green-600
font-bold
shadow-md
hover:scale-110
transition
cursor-pointer
"
              >
                +
              </button>
            )}

            {!isRoot && (
              <button
                onClick={() =>
                  dispatch(deleteNode(node.id))
                }
className="
w-8 h-8
rounded-full
text-xl
flex justify-center items-center
bg-red-500
text-white
font-bold
shadow-md
hover:scale-110
transition
cursor-pointer
"
              >
                −
              </button>
            )}

            <button
              onClick={() => setShowMenu(!showMenu)}
className="
text-2xl
px-2
font-bold
hover:bg-white/20
rounded-md
cursor-pointer
transition
"
            >
              ⋮
            </button>
          </div>
        </div>

        {showMenu && (
<div
  className="
  mt-4
  flex flex-col gap-2
  animate-[fadeInScale_0.25s_ease-out]
"
>
            {node.type === "director" && (
              <button
                onClick={() => {
                  dispatch(addNode(node.id));
                  setShowMenu(false);
                }}
className="
bg-white
text-blue-700
rounded-lg
px-4 py-2
font-medium
hover:bg-blue-50
transition
cursor-pointer
"
              >
                Add New Subordinate Branch
              </button>
            )}

            {node.type === "subordinate" && (
              <button
                onClick={() => {
                  dispatch(
                    addSubordinateBranch(node.id)
                  );
                  setShowMenu(false);
                }}
className="
bg-white
text-green-700
rounded-lg
px-4 py-2
font-medium
hover:bg-green-50
transition
cursor-pointer
"
              >
                Add Subordinate Branch
              </button>
            )}

            {node.type === "member" && (
              <button
                onClick={() => {
                  dispatch(
                    addSubBranchMember(node.id)
                  );
                  setShowMenu(false);
                }}
className="
bg-white
text-orange-700
rounded-lg
px-4 py-2
font-medium
hover:bg-orange-50
transition
cursor-pointer
"
              >
                Add Sub Branch Member
              </button>
            )}
          </div>
        )}
      </div>

      {node.children.length > 0 && (
        <div className="mt-5">
<div
  className={`
    border-2
    rounded-2xl
    p-5
    shadow-inner
    ${style.container}
  `}
>
            <div
              className={
                isRoot
                  ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
                  : "space-y-4"
              }
            >
              {members.map((child) => (
                <TreeNode
                  key={child.id}
                  node={child}
                />
              ))}

              {subordinates.map((child) => (
                <div
  key={child.id}
  className="
    border-2
    border-green-300
    rounded-2xl
    bg-white/80
    p-4
    shadow-md
    hover:shadow-lg
    transition-all
  "
>
                  <TreeNode node={child} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}