import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { CategoryScale } from "chart.js";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

Chart.register(CategoryScale);

const App: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [chartDatas, setChartDatas] = useState<any>(null);
  const [selectCandidate, setSelectCandidate] = useState<any>(null);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    // Fazer a primeira requisição para obter os candidatos
    axios
      .get("http://localhost:3000/candidates", {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "User-Agent": "react",
          Accept: "*/*",
        },
      })
      .then((response) => {
        setCandidates(response.data);
        setSelectCandidate(response.data[0]);
      })
      .catch((error) => {
        console.error("Erro ao obter candidatos", error);
      });
  }, []);

  const fetchDataForCandidate = async (candidate: any) => {
    try {
      // Fazer a segunda requisição para obter as estatísticas com base no ID do candidato
      const response = await axios.get(
        `http://localhost:3000/candidates/${candidate.id}/statistics?percentage=true`,
        {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "User-Agent": "react",
            Accept: "*/*",
          },
        }
      );
      const pesquisa = response.data;
      setChartDatas(pesquisa.researches);
    } catch (error) {
      console.error("Erro ao obter estatísticas", error);
    }
  };

  useEffect(() => {
    if (candidates.length > 0) {
      fetchDataForCandidate(selectCandidate);
    }
  }, [selectCandidate]);

  function returnTabsChart() {
    if (!chartDatas) {
      return (
        <Tab eventKey={"LOADING"} title={"LOADING"}>
          <div>
            <h1>Loading....</h1>
          </div>
        </Tab>
      );
    }

    return chartDatas.map((chart, index) => {
      const rd = new Date(chart.date);
      const labels = Object.keys(chart.statesCount);
      const data = Object.values(chart.statesCount);
      const config = {
        labels,
        datasets: [
          {
            type: "bar",
            label: "Porcentagem de votos",
            data,

            labels,
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
            borderColor: "black",
            borderWidth: 2,
            interaction: {
              // Overrides the global setting
              mode: "index",
            },
          },
        ],
      };
      return (
        <Tab eventKey={"chart" + index} title={`${rd.toLocaleDateString()}`}>
          {chartDatas && (
            <div className="chart-container">
              <Bar data={config} />
            </div>
          )}
        </Tab>
      );
    });
  }

  function getStastisticsCandidate(event) {
    console.log(event.target.id);
    const newCandidate = candidates.find((c) => c.id === event.target.id);
    setSelectCandidate(newCandidate);
  }

  function candidateButtons() {
    if (!candidates) return <></>;
    return candidates.map((c) => {
      return (
        <Col md={2}>
          <Button onClick={getStastisticsCandidate} id={c.id}>
            {" "}
            Candidato: {c.name}
          </Button>
        </Col>
      );
    });
  }

  const handleUploadClick = async () => {
    if (!file) {
      return;
    }
    const fd = new FormData();
    fd.append("file", file);
    await axios
      .post("http://localhost:3000/research/upload", file, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  if (!selectCandidate) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container className=".bg-dark">
        <div>
          <div>
            <Container fluid>
              <Row>{candidateButtons()}</Row>
            </Container>
          </div>

          <Tabs
            defaultActiveKey="chart0"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            {returnTabsChart()}
          </Tabs>
          {/* <div>
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleUploadClick}>Upload</Button>
          </div> */}
        </div>
      </Container>
    );
  }
};

export default App;
