import React from 'react';
import RegisterForm from '../containers/RegisterForm';
import styles from './LandingPage.module.scss';

const LandingPage = (params) => {
    return (
        <div className={styles.cardcontainer}>
            <div>
                <p className={styles.textcontainer}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque quis auctor nisl. Sed suscipit nisi non ultricies
                    tincidunt. Praesent vel vestibulum est. Aenean porttitor
                    risus id consequat facilisis. Duis laoreet, mauris id
                    eleifend blandit, lorem dolor venenatis dui, in blandit
                    nulla ex sit amet libero. Donec ultricies scelerisque arcu,
                    luctus ullamcorper arcu sollicitudin vel. Aenean pretium
                    cursus consectetur. Donec pellentesque nisi sed augue
                    faucibus, eu vehicula nisl posuere. Donec euismod, enim eget
                    imperdiet placerat, tortor sapien ultrices magna, at luctus
                    neque ante sed magna. Nunc hendrerit convallis arcu, vel
                    viverra est mollis quis. Suspendisse fringilla lacus tellus,
                    sed pharetra arcu fringilla in. Cras blandit arcu id nisl
                    tempus mattis. Quisque faucibus elit nisl, in dignissim
                    metus dapibus et. Aenean nunc turpis, volutpat ut convallis
                    vel, bibendum ut mi. Vestibulum a posuere velit. Etiam nec
                    rutrum nisl. Duis cursus ipsum vitae sem rutrum, non
                    faucibus ligula vulputate. Pellentesque efficitur tellus
                    nisi, convallis tristique mauris ultricies nec. Donec ipsum
                    ex, aliquet vel aliquam non, molestie quis metus. Donec
                    ullamcorper sodales arcu, a dapibus turpis porttitor vel.
                    Nam id dapibus tellus. Nulla aliquet diam ac arcu semper
                    scelerisque nec nec ipsum. Morbi tempor nisl augue, nec
                    molestie lorem dignissim posuere. Integer convallis nec
                    ligula non gravida. Donec eget pretium massa. Morbi purus
                    risus, semper non ante quis, sodales ultricies erat. Sed vel
                    malesuada diam. Sed ut fermentum justo. Quisque eget orci
                    odio. Vivamus dapibus posuere fringilla. Mauris volutpat
                    nisl eget molestie malesuada. Sed congue, orci nec aliquam
                    lobortis, ex orci consequat dui, in euismod mi turpis varius
                    tellus. Pellentesque et luctus justo, in tempus sapien.
                    Nullam dolor mauris, mattis in finibus nec, malesuada at
                    urna. Maecenas lobortis, felis at luctus suscipit, ante est
                    sagittis elit, et lobortis ipsum sapien quis nisl.
                </p>
            </div>
            <RegisterForm />
        </div>
    );
};

export default LandingPage;
