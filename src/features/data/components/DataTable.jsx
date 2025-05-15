import SearchBar from "./SearchBar";
import { PenSquare, Trash } from "lucide-react";

function DataTable({
  data,
  handleEdit,
  handleDelete,
  searchQuery,
  setSearchQuery,
}) {

    const filteredData = data.filter((dataObj)=>(
        dataObj["name"]?.toLowerCase().includes(searchQuery)
    ))

  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead className="bg-gray-700 w-full">
            {data.length === 0 && (
              <tr className="w-full">
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No data available
                </td>
              </tr>
            )}
            {data.length > 0 && (
              <tr className="w-full">
                {Object.keys(data[0]).map((key, index, arr) => (
                  <th
                    key={index}
                    className={`px-3 py-2 text-center text-xs font-semibold w-1/${
                      arr.length + 1
                    }`}
                  >
                    {key.toUpperCase()}
                  </th>
                ))}
                <th
                  className={`px-3 py-2 text-xs text-center font-semibold w-1/${
                    Object.keys(data[0]).length + 1
                  }`}
                >
                  ACTION
                </th>
              </tr>
            )}
          </thead>
          <tbody>
            {filteredData.map((dataObj, index) => (
              <tr
                key={dataObj.id}
                className="border-b border-gray-700 hover:bg-gray-700/50 w-full"
              >
                {Object.keys(dataObj).map((key) => (
                  <td key={key} className="px-3 py-2 text-sm text-center">
                    {typeof dataObj[key] === 'string' && dataObj[key].includes('/') ? (
                      <img src={dataObj[key]} alt={key} className="h-6 w-6 m-auto" />
                    ) : (
                      dataObj[key]
                    )}
                  </td>
                ))}
                <td className="px-3 py-2 text-center">
                  <div className="flex justify-center gap-1">
                    <button
                      onClick={() => handleEdit(dataObj)}
                      className="p-1 hover:bg-gray-600 rounded"
                    >
                      <PenSquare className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(dataObj.id)}
                      className="p-1 hover:bg-gray-600 rounded"
                    >
                      <Trash className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;
