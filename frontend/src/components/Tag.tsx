import React from 'react';
import { View } from 'react-native';
import { InlineTextIcon } from './InlineTextIcon';
import RatingsStars from './RatingsStars';

const Tag = ({ tagValue, tagName }: any) => {
  return (
    <View
      style={{
        paddingRight: 10,
      }}
    >
      {tagName === 'playTime' && <InlineTextIcon icon={'time-outline'} text={`${tagValue} min`} />}
      {tagName === 'players' && (
        <InlineTextIcon icon={'people-outline'} text={`${tagValue.join('-')} Players`} />
      )}
      {tagName === 'meanReviews' && <RatingsStars rating={tagValue} />}
    </View>
  );
};

export default Tag;
