import {
  PreSignUpTriggerHandler,
  PostConfirmationTriggerHandler,
  PostAuthenticationTriggerHandler,
  PreTokenGenerationTriggerHandler,
} from 'aws-lambda';
import db from './db';
import logger from './utils/logger';

export const preSignUp: PreSignUpTriggerHandler = async (
  event,
  context,
  callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const id = event.userName;
  const { email } = event.request.userAttributes;
  const fullName = 'USER-' + id.split('-')[0];

  try {
    await db.user.create({
      data: { id, email, fullName, profile: { create: {} } },
    });
    logger.user.info('User created');
  } catch (error) {
    logger.user.error('Create user error', error);
  }

  callback(null, event);
};

export const postComfirmation: PostConfirmationTriggerHandler = async (
  event,
  context,
  callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await db.user.update({
    where: { id: event.userName },
    data: { status: 'ENABLED' },
  });

  callback(null, event);
};

export const postAuthentication: PostAuthenticationTriggerHandler = (
  event,
  context,
  callback
) => {
  callback(null, event);
};

export const preTokenGeneration: PreTokenGenerationTriggerHandler = (
  event,
  context,
  callback
) => {
  callback(null, event);
};
