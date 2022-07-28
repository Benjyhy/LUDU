import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from '../location.controller';
import { LocationService } from '../location.service';
import { userStub } from '../../user/test/stubs/user.stub';
import { Location } from '../../../schemas/location.schema';
import { locationStub } from './stubs/location.stub';

jest.mock('../location.service');

describe('LocationController', () => {
  let locationController: LocationController;
  let locationService: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [LocationService],
    }).compile();

    locationController = module.get<LocationController>(LocationController);
    locationService = module.get<LocationService>(LocationService);
    jest.clearAllMocks();
  });

  describe('getLocation', () => {
    describe('when get location By ID is called', () => {
      let location: Location;

      beforeEach(async () => {
        await locationController.findById(userStub()._id);
      });
      test('then it should called locationService', () => {
        expect(locationService.findById).toBeCalledWith(userStub()._id);
      });

      test('then it should return a location', () => {
        expect(location).toEqual(locationStub());
      });
    });
  });
});
