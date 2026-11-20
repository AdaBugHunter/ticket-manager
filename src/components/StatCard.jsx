
function StatCard({ title, count, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <p>{title}</p>
      <h2>{String(count).padStart(2, "0")}</h2>
    </div>
  );
}

export default StatCard;
