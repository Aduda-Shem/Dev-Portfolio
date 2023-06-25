import React, { useContext } from 'react';
import {
  Button, Card, Badge, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
    height: 600,

  },
  cardImageStyle: {
    objectFit: 'cover',
    height: 180,
    width: 180,
  },
  cardTitleStyle: {
    fontSize: 20,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: 'left',
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
  },
};

const ProjectCard = (props) => {
  const { project } = props;
  const {
    bsSecondaryVariant,
    cardBackground,
    cardBorderColor,
    cardFooterBackground,
    bsPrimaryVariant,
  } = useContext(ThemeContext); // Destructure the theme values

  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: cardBackground, // Use destructured theme value
          borderColor: cardBorderColor, // Use destructured theme value
        }}
        text={bsSecondaryVariant} // Use destructured theme value
      >
        <Card.Img variant="top" src={project?.image} />
        <Card.Body>
          <Card.Title style={styles.cardTitleStyle}>
            {project.title}
          </Card.Title>
          <Card.Text style={styles.cardTextStyle}>
            {parseBodyText(project.bodyText)}
          </Card.Text>
        </Card.Body>

        <Card.Body>
          {project?.links?.map((link) => (
            <Button
              key={link.href}
              style={styles.buttonStyle}
              variant={'outline-' + bsSecondaryVariant} // Use destructured theme value
              onClick={() => window.open(link.href, '_blank')}
            >
              {link.text}
            </Button>
          ))}
        </Card.Body>
        {project.tags && (
          <Card.Footer style={{ backgroundColor: cardFooterBackground }}>
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                pill
                bg={bsSecondaryVariant} // Use destructured theme value
                text={bsPrimaryVariant} // Use destructured theme value
                style={styles.badgeStyle}
              >
                {tag}
              </Badge>
            ))}
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      }),
    ),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
