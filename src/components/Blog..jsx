import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import BlogCard from './Blog/BlogCard'; // Import the BlogCard component
import FallbackSpinner from './FallbackSpinner';

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  showMoreStyle: {
    margin: 25,
  },
};

const Blogs = (props) => {
  const { header } = props;
  const { bsSecondaryVariant } = useContext(ThemeContext); // Destructure the theme object
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.blogs, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);
  const numberOfItems = showMore && data ? data.length : 6;
  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Container style={styles.containerStyle}>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {data.blogs?.slice(0, numberOfItems).map((blog) => (
                <Fade key={blog.title}>
                  <BlogCard blog={blog} />
                </Fade>
              ))}
            </Row>

            {!showMore && (
              <Button
                style={styles.showMoreStyle}
                variant={bsSecondaryVariant} // Use the destructured theme value
                onClick={() => setShowMore(true)}
              >
                show more
              </Button>
            )}
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
};

Blogs.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Blogs;
