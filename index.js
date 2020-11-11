import { useReducer } from 'hookuspocus/src/use_reducer'
import { useState } from 'hookuspocus/src/use_state'
import { useEffect } from 'hookuspocus/src/use_effect'
import { useLayoutEffect } from 'hookuspocus/src/use_layout_effect'
// import { useReducer, useState, useLayoutEffect, useEffect } from 'hookuspocus/dist/hookuspocus'
import { createContext, useContext } from './src/provider'
import locoDOM, { act } from './src/renderer'
import locomotor from './locomotor'

const L = 'Locomotor.Fragment'

export {
  locomotor as default,
  locoDOM,
  useReducer,
  useState,
  useEffect,
  useLayoutEffect,
  createContext,
  useContext,
  L,
  act
}