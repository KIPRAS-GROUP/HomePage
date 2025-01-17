"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import styles from './aboutUs.module.css';
import darkStyles from './aboutUsDark.module.css';

interface OurMissionAndVisionProps {
  isDarkMode: boolean;
}

const OurMissionAndVision: React.FC<OurMissionAndVisionProps> = ({ isDarkMode }) => {
  const accordionClassName = isDarkMode
    ? `${styles.ourMissionAndVisionAccordion} ${darkStyles.ourMissionAndVisionAccordion}`
    : styles.ourMissionAndVisionAccordion;
  const itemHeadingClassName = isDarkMode
    ? `${styles.accordionItemHeading} ${darkStyles.accordionItemHeading}`
    : styles.accordionItemHeading;
  const itemButtonClassName = isDarkMode
    ? `${styles.accordionItemButton} ${darkStyles.accordionItemButton}`
    : styles.accordionItemButton;
  const itemPanelClassName = isDarkMode
    ? `${styles.accordionItemPanel} ${darkStyles.accordionItemPanel}`
    : styles.accordionItemPanel;

  return (
    <>
      <Accordion
        preExpanded={["a"]}
        className={accordionClassName}
      >
        <AccordionItem uuid="a">
          <AccordionItemHeading className={itemHeadingClassName}>
            <AccordionItemButton className={itemButtonClassName}>Misyonumuz</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={itemPanelClassName}>
            <p className={isDarkMode ? darkStyles.accordionText : ''}>
              KİPRAS GROUP olarak misyonumuz, estetik, işlevsellik ve sürdürülebilirliği bir araya getirerek, kullanıcıların ihtiyaçlarına ve hayallerine cevap veren, zamana meydan okuyan mimari eserler yaratmaktır.
            </p>
          </AccordionItemPanel>
        </AccordionItem>

        <AccordionItem uuid="b">
          <AccordionItemHeading className={itemHeadingClassName}>
            <AccordionItemButton className={itemButtonClassName}>Vizyonumuz</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={itemPanelClassName}>
            <p className={isDarkMode ? darkStyles.accordionText : ''}>
              Vizyonumuz, yenilikçi ve sürdürülebilir mimari çözümlerle, Türkiye'de ve dünyada örnek gösterilen, öncü bir mimarlık firması olmaktır.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default OurMissionAndVision;