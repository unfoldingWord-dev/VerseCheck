var style = {
  pane: {
    contentLTR: {
      marginTop: "5px",
      height: "130px",
      overflowY: 'auto',
      width: '100%',
      direction: 'ltr'
    },
    contentRTL: {
      marginTop: "5px",
      height: "130px",
      overflowY: 'auto',
      width: '100%',
      direction: 'rtl'
    },
    header: {
      margin: '5px 0',
      width: '100%',
      color: '#44c6ff',
      fontWeight: 'bold',
      fontSize: '28px'
    },
    title: {
      fontWeight: '700',
      fontSize: '14px',
      marginBottom: "-5px",
      marginTop: "5px",
      display: "flex",
    }
  },
  dropzone: {
    active: {
      border: '2px solid #727272',
      backgroundColor: '#f5f5f5'
    },
    text: {
      lineHeight: '200px',
      verticalAlign: 'middle',
      width: '100%'
    },
    main: {
      width: '100%',
      color: '#212121',
      height: '200px',
      border: '2px dashed #727272',
      borderRadius: '5px',
      fontSize: '25px'
    }
  },
  menuItem: {
    text: {
      cursor: 'pointer'
    },
    flag: {
      enabled: {
        color: '#CC0000',
        visibility: 'visible'
      },
      disabled: {
        visibility: 'hidden'
      }
    },
    statusIcon: {
      correct: {
        color: 'green',
        display: 'initial'
      },
      replaced: {
        color: 'gold',
        display: 'initial'
      },
      flagged: {
        color: 'red',
        display: 'initial'
      },
      unchecked: {
        display: 'none'
      }
    }
  },
  headingDescription:{
    color: "var(--text-color-light)",
    fontStyle: 'bold',
    fontFamily: "noto sans"
  },
  verseCheck: {
    flex: '1 1 200px',
    margin: '10px',
  },
  verseCheckCard: {
    flex: 'auto',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 3px 10px var(--background-color)',
    borderRadius: '2px',
  },
  titleBar: {
    flex: '0 0 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    color: 'var(--reverse-color)',
    backgroundColor: 'var(--accent-color-dark)',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  verseTitle: {
    flex: '0 0 35px',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 10px 5px 15px'
  }
};

module.exports = style;
