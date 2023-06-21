import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  sectionContentContainer: {
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: '#808080',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  introContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introTextContainer: {
    width: '60%',
    textAlign: 'center',
    color: '#000',
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

function About({ header }) {
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown>{text}</ReactMarkdown>
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div style={styles.sectionContentContainer}>
        <Container>
          {data ? (
            <Fade>
              <Row>
                <Col style={styles.introContainer}>
                  <div style={styles.introTextContainer}>
                    <img
                      src={data?.imageSource}
                      alt="profile"
                      style={styles.profileImage}
                    />
                    <h2>{data?.name}</h2>
                    <p>{data?.role}</p>
                    <p>{data?.location}</p>
                    {parseIntro(data.about)}
                  </div>
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
