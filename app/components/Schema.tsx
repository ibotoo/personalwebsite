import React from 'react';

const Schema = () => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'İbrahim Can Sancar',
        alternateName: 'İbrahim Sancar',
        url: 'https://ibrahimcansancar.com',
        jobTitle: 'Girişimci',
        sameAs: [
            'https://twitter.com/ibrahimcansncar',
            'https://github.com/ibrahim-sancar',
            'https://www.linkedin.com/in/ibrahim-can-sancar/'
        ],
        knowsAbout: [
            'Web Development', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js'
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default Schema; 