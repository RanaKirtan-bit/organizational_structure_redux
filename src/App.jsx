import { useSelector } from "react-redux";
import TreeNode from "./components/TreeNode";

export default function App() {
  const tree = useSelector((state) => state.orgTree.tree);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-8">
      <h1 className="text-center text-4xl font-bold mb-10">
        Organizational Structure
      </h1>

      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border">
        <div className="flex justify-center">
          <TreeNode node={tree} isRoot />
        </div>
      </div>
    </div>
  );
}