import { computeScaling } from '../src';

test('downscale and crop to target dimensions', () => {
  const testImageDimensions = {
    width: 140,
    height: 130,
  };
  const testTargetDimensions = {
    width: 50,
    height: 10,
  };
  const crop = true;

  const fact = computeScaling(testImageDimensions, testTargetDimensions, crop);
  expect(fact.scaleFactor).toBeCloseTo(
    testTargetDimensions.width / testImageDimensions.width,
    4,
  );
  expect(fact.dimensions).toMatchObject(testTargetDimensions);
});

test('downscale but do not crop', () => {
  const testImageDimensions = {
    width: 140,
    height: 130,
  };
  const testTargetDimensions = {
    width: 50,
    height: 10,
  };
  const shrinkedDimension = {
    width: Math.round(
      (testImageDimensions.width * testTargetDimensions.height) /
        testImageDimensions.height,
    ),
    height: testTargetDimensions.height,
  };
  const crop = false;

  const fact = computeScaling(testImageDimensions, testTargetDimensions, crop);
  expect(fact.scaleFactor).toBeCloseTo(
    testTargetDimensions.height / testImageDimensions.height,
    4,
  );
  expect(fact.dimensions).toMatchObject(shrinkedDimension);
});

test('downscale and crop when overlapping', () => {
  const testImageDimensions = {
    width: 140,
    height: 10,
  };
  const testTargetDimensions = {
    width: 20,
    height: 90,
  };
  const shrinkedDimension = {
    width: Math.min(testImageDimensions.width, testTargetDimensions.width),
    height: Math.min(testImageDimensions.height, testTargetDimensions.height),
  };
  const crop = true;

  const fact = computeScaling(testImageDimensions, testTargetDimensions, crop);
  expect(fact.scaleFactor).toBeCloseTo(1, 4);
  expect(fact.dimensions).toMatchObject(shrinkedDimension);
});

test('downscale and do not crop when overlapping', () => {
  const testImageDimensions = {
    width: 140,
    height: 10,
  };
  const testTargetDimensions = {
    width: 20,
    height: 90,
  };
  const shrinkedDimension = {
    width: testTargetDimensions.width,
    height: Math.round(
      (testImageDimensions.height * testTargetDimensions.width) /
        testImageDimensions.width,
    ),
  };
  const crop = false;

  const fact = computeScaling(testImageDimensions, testTargetDimensions, crop);
  expect(fact.scaleFactor).toBeCloseTo(
    testTargetDimensions.width / testImageDimensions.width,
    4,
  );
  expect(fact.dimensions).toMatchObject(shrinkedDimension);
});

test('do not upscale when cropping', () => {
  const testTargetDimensions = {
    width: 120,
    height: 130,
  };
  const testImageDimensions = {
    width: 50,
    height: 10,
  };
  const crop = true;

  const fact = computeScaling(testImageDimensions, testTargetDimensions, crop);
  expect(fact.scaleFactor).toBe(1);
  expect(fact.dimensions).toMatchObject(testImageDimensions);
});

test('do not upscale whithout cropping', () => {
  const testTargetDimensions = {
    width: 120,
    height: 130,
  };
  const testImageDimensions = {
    width: 50,
    height: 10,
  };
  const crop = false;

  const fact = computeScaling(testImageDimensions, testTargetDimensions, crop);
  expect(fact.scaleFactor).toBe(1);
  expect(fact.dimensions).toMatchObject(testImageDimensions);
});
