import { OpenPosition } from "../content/types";

export const OpenPositionCard = ({
  title,
  description,
  requirements,
  responsibilities,
  location,
  type,
  duration,
}: OpenPosition) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-6 bg-white shadow-sm">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
          <span className="bg-gray-100  px-2 py-1 rounded">
            {type}
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded">
            {location}
          </span>
          {duration && (
            <span className="bg-gray-100 px-2 py-1 rounded">
              {duration}
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Responsibilities:</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          To apply, please send your CV, cover letter, and references to{" "}
          <a
            href="mailto:christoph.messner@siaf.uzh.ch"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            christoph.messner@siaf.uzh.ch
          </a>
        </p>
      </div>
    </div>
  );
};
