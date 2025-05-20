exports.calculateAge = (req, res) => {
  const { dob, customDate } = req.body; // Accept customDate from the request body
  const birthDate = new Date(dob);

  // If customDate is provided, use it; otherwise, use the current date
  const currentDate = customDate ? new Date(customDate) : new Date();

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  // Adjust if the month/day is negative
  if (months < 0) {
    months += 12;
    years--;
  }
  if (days < 0) {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      0
    );
    days += prevMonth.getDate();
    months--;
  }

  res.json({ years, months, days });
};
