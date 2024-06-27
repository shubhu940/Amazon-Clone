import React from 'react';
import YouTube from 'react-youtube';
import { videoData } from './YoutubeData';
import { Container, Col, Row, Card } from 'react-bootstrap';

const YouTubeVideo = () => {
    const opts = {
        height: '160',
        width: '100%',
        playerVars: {
            autoplay: 0,
        }
    };

    return (
        <Container className='my-5'>
            <Row className='py-5 mt-5'>
                {videoData.map((video, index) => (
                    <Col key={index} xs={6} sm={6} md={4} lg={3} xl={3} className='mb-3'>
                        <Card className='shadow h-100' style={{ width: '100%' }}>
                            <YouTube videoId={video.videoId} opts={opts} />
                            <Card.Body>
                                <Card.Title>{video.title}</Card.Title>
                                <Card.Text>{video.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default YouTubeVideo;
