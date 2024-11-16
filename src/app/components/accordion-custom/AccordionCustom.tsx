import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionCustom = ({
  title,
  children,
  expanded = false,
}: {
  title: string;
  children: JSX.Element;
  expanded?: boolean;
}) => {
  return (
    <Accordion defaultExpanded={expanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionCustom;
