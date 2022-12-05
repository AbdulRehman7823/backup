import React from "react";
import adminServices from "../Services/AdminServices";
import alert from "../Services/Alert";

const Poetries = () => {
  const [items, setItems] = React.useState([
    {
      title: "Love",
      description:
        "  Lorem ipsum dolor sit amet consectetur, adipisicing elit. A aperiam commodi saepe nulla architecto voluptatum possimus, laboriosam fugit cumque officia adipisci laudantium eum error quia eligendi doloremque temporibus ullam? Ratione",
    },
    {
      title: "Sad",
      description:
        "  Lorem ipsum dolor sit amet consectetur, adipisicing elit. A aperiam commodi saepe nulla architecto voluptatum possimus, laboriosam fugit cumque officia adipisci laudantium eum error quia eligendi doloremque temporibus ullam? Ratione",
    },
    {
      title: "Fun",
      description:
        "  Lorem ipsum dolor sit amet consectetur, adipisicing elit. A aperiam commodi saepe nulla architecto voluptatum possimus, laboriosam fugit cumque officia adipisci laudantium eum error quia eligendi doloremque temporibus ullam? Ratione",
    },
  ]);

  function getData() {
    adminServices
      .getPoetries()
      .then((data) => {
        //setItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function removeItem(_id) {
    adminServices
      .deletePoetry(_id)
      .then((res) => {
        console.log(res);
        setItems(items.filter((u) => u._id !== _id));
      })
      .catch((err) => console.log(err.message));
    alert.showSuccessAlert("item removed successfully!");
  }

  React.useEffect(getData, []);
  return (
    <div id="products" className="container">
      {/* Table code starting from here */}
      <h1 className="m-5">Poetries</h1>
      {items.length == 0 ? (
        <h3 className="ms-5">There is no poetry yet!</h3>
      ) : (
        <>
          {" "}
          <table className="table shadow text-center">
            <thead className="table-head">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>

                <th scope="col">Actions</th>
              </tr>
            </thead>
            {typeof items !== "object" ? (
              <></>
            ) : (
              <tbody>
                {items.map((item) => (
                  <tr>
                    <td className="min">{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      <input
                        type="button"
                        value="Remove"
                        className="btn btn-danger me-2 t-buttons mb-2"
                        onClick={(e) => removeItem(item._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </>
      )}
    </div>
  );
};

export default Poetries;
