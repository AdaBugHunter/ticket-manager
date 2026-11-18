
function PriorityBadge({ priority }) {
  return (
    <span
      className={`priority-badge ${priority?.toLowerCase()}`}
    >
      {priority} priority
    </span>
  );
}

export default PriorityBadge;
