import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { decode } from "he";
import { Pagination } from "@material-ui/lab";

const API_URL = "http://localhost:8080";

export const App = () => {
  const [response, setResponse] = useState({});

  const fetchPage = (page = 1) => {
    axios.get(`${API_URL}?page=${page}&limit=5`).then((r) => {
      setResponse(r.data);
    });
  };

  useEffect(() => {
    fetchPage();
  }, []);

  return (
    <div>
      <Pagination
        count={response.totalPages}
        page={+response.page}
        onChange={(_, page) => fetchPage(page)}
      />
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#ccc",
          fontFamily: "'Roboto', sans-serif",
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {response.docs &&
          response.docs.map((offer) => (
            <div
              key={offer.id}
              style={{
                width: "350px",
              }}
            >
              <div
                style={{
                  border: "1px solid black",
                  marginBottom: "100px",
                  display: "inline-block",
                  backgroundColor: "white",
                }}
              >
                {Object.entries(offer).map(([key, value]) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      border: "1px solid black",
                      margin: "10px",
                      backgroundColor: "#eee",
                      padding: "5px 15px",
                    }}
                  >
                    <div
                      style={{
                        marginRight: "50px",
                        flex: 1,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {key.toString()}
                    </div>
                    <div style={{ flex: 6 }}>
                      {key === "photos" ? (
                        <div>
                          {value.length
                            ? value.map((photo, i) => (
                                <span>
                                  <img
                                    src={photo}
                                    alt=""
                                    style={{
                                      width: "150px",
                                      height: "80px",
                                      objectFit: "contain",
                                      margin: "2px 10px",
                                    }}
                                  />
                                  <span>{+i + 1}</span>
                                </span>
                              ))
                            : "Nie znaleziono żadnych zdjęć"}
                        </div>
                      ) : (
                        <div> {decode(value.toString())}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
