export default function CatererCard({ caterer }) {
  return (
    <div className="border rounded-xl p-4 shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2 text-gray-700">
        {caterer.name}
      </h2>

      <p className="text-gray-600">
        <strong>Location:</strong> {caterer.location}
      </p>

      <p className="text-gray-600">
        <strong>Price Per Plate:</strong> ₹
        {caterer.pricePerPlate}
      </p>

      <p className="text-gray-600">
        <strong>Cuisines:</strong>{" "}
        {caterer.cuisines.join(", ")}
      </p>

      <p className="text-gray-700">
        <strong>Rating:</strong> ⭐ {caterer.rating}
      </p>
    </div>
  );
}