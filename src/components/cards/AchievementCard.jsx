import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import styled from "styled-components";

const Top = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;

const Image = styled.img`
  height: 50px;
  border-radius: 10px;
  margin-top: 4px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary + 99};
`;

const Organization = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
`;

const Description = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  margin-bottom: 10px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 5px;
`;

const Tag = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const AchievementCard = ({ achievement }) => {
  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={achievement?.organization}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          src={achievement?.img}
        />
      }
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "#1d1836",
        color: "#fff",
        boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        backgroundColor: "rgba(17, 25, 40, 0.83)",
        border: "1px solid rgba(255, 255, 255, 0.125)",
        borderRadius: "6px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid  rgba(255, 255, 255, 0.3)",
      }}
      date={achievement?.date}
    >
      <Top>
        <Image src={achievement?.img} />
        <Body>
          <Title>{achievement?.title}</Title>
          <Organization>{achievement?.organization}</Organization>
          <Date>{achievement?.date}</Date>
        </Body>
      </Top>
      {achievement?.desc && <Description>{achievement.desc}</Description>}
      {achievement?.tags && (
        <Tags>
          {achievement.tags.map((tag, index) => (
            <Tag key={index}>• {tag}</Tag>
          ))}
        </Tags>
      )}
    </VerticalTimelineElement>
  );
};

export default AchievementCard;
