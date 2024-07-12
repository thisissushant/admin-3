/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import SubCard from "ui-component/cards/SubCard";
import { IconRocket, IconPointer } from "@tabler/icons-react";

const ActivateSolution = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCards, setSelectedCards] = useState({});

  useEffect(() => {
    setLoading(false);
  }, []);

  const solutions = [
    {
      id: 101,
      title: "Automation 360",
      description: "Automating Mundane Tasks",
      link: "/automation360",
      icon: <IconRocket />, // Add the icon component here
      items: [
        "Post PO Collaboration",
        "Missing Document Follow Up",
        "Maintain & Track Certificates",
      ],
    },
    {
      id: 102,
      title: "Intake Request",
      description: "Single door entry to place any kind of request",
      link: "/data-analytics-pro",
      icon: <IconPointer />, // Add the icon component here
      items: ["Create Intake Request", "Track Intake Request"],
    },
  ];

  const handleCardSelection = (id) => {
    setSelectedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Our Solutions</h1>
      <Grid container spacing={3}>
        {solutions.map((solution) => {
          const isDisabled = !solution.items;
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={solution.id}>
              <SubCard
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {solution.icon}
                    <span style={{ marginLeft: 8 }}>{solution.title}</span>
                  </div>
                }
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  opacity: isDisabled ? 0.5 : 1,
                  pointerEvents: isDisabled ? "none" : "auto",
                }}
              >
                <Grid
                  container
                  direction="column"
                  spacing={1}
                  style={{ flexGrow: 1 }}
                >
                  <Grid item>
                    <MuiTypography variant="body2" display="block" gutterBottom>
                      {solution.description}
                    </MuiTypography>
                  </Grid>
                  <Grid item style={{ flexGrow: 1 }}>
                    {solution.items ? (
                      <FormGroup>
                        {solution.items.map((item, index) => (
                          <FormControlLabel
                            control={<Checkbox />}
                            label={item}
                            key={index}
                          />
                        ))}
                      </FormGroup>
                    ) : (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!selectedCards[solution.id]}
                            onChange={() => handleCardSelection(solution.id)}
                          />
                        }
                        label=""
                      />
                    )}
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ActivateSolution;
