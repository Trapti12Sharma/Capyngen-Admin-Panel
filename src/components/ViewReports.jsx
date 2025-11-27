import { motion } from "framer-motion";

export default function ViewReports() {
  const activities = [
    {
      type: "Blog Created",
      title: "AI Trends",
      date: "Today",
      status: "Success",
    },
    {
      type: "Blog Deleted",
      title: "ML Guide",
      date: "Yesterday",
      status: "Deleted",
    },
    {
      type: "Career Added",
      title: "Frontend Developer",
      date: "Today",
      status: "Success",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white p-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold mb-6">📊 System Activity Reports</h1>

        <div className="bg-[#020617] p-6 rounded-3xl shadow-xl">
          <table className="w-full text-sm">
            <thead className="text-white/60">
              <tr>
                <th className="text-left py-2">Action</th>
                <th className="text-left py-2">Title</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {activities.map((a, i) => (
                <tr key={i} className="border-t border-white/10">
                  <td className="py-3">{a.type}</td>
                  <td className="py-3">{a.title}</td>
                  <td className="py-3">{a.date}</td>
                  <td className="py-3 text-green-400">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
