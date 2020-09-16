import { v4 as uuidv4 } from 'uuid';
export function getDefaultDashboardConfig() {
  return {
    section1: getSectionOneDefaultConfig(),
    section2: getSectionTwoDefaultConfig(),
    section3: getSectionThreeDefaultConfig(),
    section4: getSectionFourDefaultConfig(),
  };
}
function getSectionOneDefaultConfig() {
  return {
    id: uuidv4(),
    title: 'Overall Summary',
    type: 'summary',
    dx: [
      { id: '', label: 'Suspected cases', dhis2Name: '', suffix: '', hasPercentage: false },
      {
        id: '',
        label: 'Tested cases',
        dhis2Name: '',
        suffix: '',
        hasPercentage: true,
        percentageDx: ''
      },
      {
        id: '',
        label: 'Confirmed cases',
        dhis2Name: '',
        suffix: '',
        hasPercentage: true,
        percentageDx: ''
      },
      {
        id: '',
        label: 'Recovered cases',
        dhis2Name: '',
        suffix: '',
        hasPercentage: true,
        percentageDx: ''
      },
      {
        id: '',
        label: 'Mortality',
        dhis2Name: '',
        suffix: '',
        hasPercentage: true,
        percentageDx: ''
      },
    ],
  };
}
function getSectionTwoDefaultConfig() {
  return {
    id: uuidv4(),
    title: 'Confirmed cases and deaths in last 14 days',
    type: 'chart',
    dx: [
      {
        id: '',
        label: 'Confirmed cases',
        dhis2Name: '',
        suffix: '',
        hasCumulative: false,
        position: 'left',
      },
      {
        id: '',
        label: 'Death cases',
        dhis2Name: '',
        suffix: '',
        hasCumulative: true,
        position: 'right',
      },
    ],
  };
}
function getSectionThreeDefaultConfig() {
  return {
    id: uuidv4(),
    title: 'Tests conducted and positive cases in last 14 days',
    type: 'chart',
    dx: [
      {
        id: '',
        label: 'Tests conducted',
        dhis2Name: '',
        suffix: '',
        hasCumulative: false,
        position: 'left',
      },
      {
        id: '',
        label: 'Positive cases',
        dhis2Name: '',
        suffix: '',
        hasCumulative: false,
        position: 'right',
      },
    ],
  };
}
function getSectionFourDefaultConfig() {
  return {
    id: uuidv4(),
    title: 'Summary of suspects, confirmed and death cases by state',
    type: 'table',
    dx: [
      {
        id: '',
        label: 'Suspects',
        dhis2Name: '',
        suffix: '',
        tablePositionIndex: 0,
      },
      {
        id: '',
        label: 'Confirmed cases',
        dhis2Name: '',
        suffix: '',
        hasCumulative: false,
        tablepositionIndex: 1,
      },
      {
        id: '',
        label: 'Death cases',
        dhis2Name: '',
        suffix: '',
        hasCumulative: false,
        tablepositionIndex: 2,
      },
    ],
  };
}
