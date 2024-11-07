export function calculateDaysToGo(createdAt, deadline) {
  const createdDate = new Date(createdAt);
  const deadlineDate = new Date(deadline);

  // Calculate the difference in milliseconds
  const differenceInMs = deadlineDate - createdDate;

  // Convert milliseconds to days
  const daysToGo = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  return daysToGo;
}

export function formatDate(dateStr, format = "MM/DD/YYYY") {
  const date = new Date(dateStr);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getUTCFullYear();

  switch (format) {
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    case "DD-MM-YYYY":
      return `${day}-${month}-${year}`;
    case "YYYY/MM/DD":
      return `${year}/${month}/${day}`;
    default:
      return date.toLocaleDateString(); // Fallback to default locale format
  }
}

export function checkAuthor(project) {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user._id === project.creatorId._id);
  return user._id === project.creatorId._id;
}
