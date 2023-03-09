import React from 'react';
import moment from 'moment';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { Tooltip } from 'react-native-elements';
import { lowGray, primaryColor } from '../../utils/const';
import { useGetCopyByIdQuery } from '../../services/LUDU_API/copies';
import { InlineTextIcon } from '../../components/InlineTextIcon';

const LeftContent = (image) => <Avatar.Image size={60} source={image} />;

const rightContent = (status) => (
  <Text style={status === 'In Progress' ? styles.inprogress : styles.finished}>{status}</Text>
);

const ControlledTooltip = (props: any) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
    />
  );
};

const CardItem = ({ item }) => {
  const newItem = { ...item };
  const { data: copy, isSuccess } = useGetCopyByIdQuery({ _id: newItem.game });
  newItem.game = copy;

  const rightBadge = () => {
    if (newItem.endDate && newItem.deliveredDate) {
      return 'Over';
    } else if (newItem.endDate && !newItem.deliveredDate) {
      return 'In Progress';
    } else if (!newItem.endDate) {
      return 'Incoming';
    }
  };

  return (
    <Card style={styles.cardStyle} mode={!newItem.deliveredDate ? 'elevated' : 'contained'}>
      {isSuccess && (
        <>
          <ControlledTooltip
            containerStyle={{ width: 220, height: 160 }}
            backgroundColor={'white'}
            popover={
              <View>
                <Text style={styles.title}>{newItem.game.game.name}</Text>
                <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 20 }}>
                  {newItem.game.game.version}
                </Text>
              </View>
            }
          >
            <Card.Title
              title={newItem.game.game.name}
              titleStyle={styles.title}
              subtitle={newItem.game.game.version}
              subtitleStyle={styles.subtitle}
              left={() => LeftContent(newItem.game.game.thumbnail)}
              right={() => rightContent(rightBadge())}
            />
          </ControlledTooltip>

          <Card.Content style={styles.content}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <InlineTextIcon
                  iconColor={primaryColor}
                  icon={'star'}
                  text={`${newItem.game.game.likes} Likes`}
                />
              </View>
              <View>
                <InlineTextIcon
                  iconColor={primaryColor}
                  icon={'play'}
                  text={`${newItem.game.game.tags.playTime || 0} plays`}
                />
              </View>
              <View>
                <InlineTextIcon
                  iconColor={primaryColor}
                  icon={'chatbubble'}
                  text={`${newItem.game.game.meanReviews || 0} Average Reviews`}
                />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                Delivery: <Text style={{ textTransform: 'capitalize' }}>{newItem.type}</Text>
              </Text>
              <ControlledTooltip
                containerStyle={{ width: 220, height: 260 }}
                backgroundColor={'white'}
                popover={
                  <Text style={{ textTransform: 'capitalize' }}>
                    {newItem.game.game.description}
                  </Text>
                }
              >
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ marginTop: 20, fontWeight: 'bold', textTransform: 'uppercase' }}
                >
                  Description:{' '}
                  <Text style={{ textTransform: 'capitalize' }}>
                    {newItem.game.game.description}
                  </Text>
                </Text>
              </ControlledTooltip>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>Booked At</Text>{' '}
                {moment(newItem.startDate).format('LLLL')}
              </Text>
            </View>
          </Card.Content>
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    height: 260,
    backgroundColor: lowGray,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 15,
    marginLeft: 20,
    marginTop: 10,
  },
  content: {
    marginTop: 20,
  },
  text: {
    marginTop: 20,
  },
  inprogress: {
    color: 'green',
    marginRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 15,
    fontStyle: 'italic',
  },
  finished: {
    color: primaryColor,
    marginRight: 10,
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default CardItem;
